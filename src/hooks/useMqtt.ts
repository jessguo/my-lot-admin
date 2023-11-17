import { useState, useEffect } from 'react';
import mqtt from 'precompiled-mqtt';
import { v4 as uuidV4 } from 'uuid';

export default function useMqtt() {
  const [client, setClient] = useState(null) as any;
  const [isConnected, setIsConnected] = useState(false);
  const [payload, setPayload] = useState({}) as any;

  const getSetting = () => {
    const clientId = 'web-iot-admin_' + uuidV4();
    return {
      hostname: 'emqx-prod.mangopower.com',
      port: 443,
      path: '/mqtt',
      protocol: 'wss',
      clean: true,
      connectTimeout: 4000,
      clientId,
      username: 'mp-iot-service',
      password: 'mangopower',
    };
  };

  const mqttConnect = async () => {
    const setting = getSetting();
    const options = {
      ...setting,
    };
    const clientMqtt = await mqtt.connect(options as any);
    setClient(clientMqtt);
  };

  const mqttDisconnect = () => {
    debugger;
    if (client) {
      client.end(() => {
        console.log('MQTT Disconnected');
        setIsConnected(false);
      });
    }
  };

  const mqttSubscribe = async (topic: string) => {
    if (client) {
      console.log('MQTT subscribe ', topic);

      const clientMqtt = await client.subscribe(
        topic,
        {
          qos: 0,
        },
        (error: any) => {
          if (error) {
            console.log('MQTT Subscribe to topics error', error);
            setIsConnected(false);
            return;
          }
        },
      );
      setClient(clientMqtt);
    }
  };

  const mqttUnSubscribe = async (topic: string) => {
    if (client) {
      const clientMqtt = await client.unsubscribe(topic, (error: any) => {
        if (error) {
          console.log('MQTT Unsubscribe error', error);
          return;
        }
      });
      setClient(clientMqtt);
    }
  };

  useEffect(() => {
    mqttConnect();
    return () => {
      mqttDisconnect();
    };
  }, []);

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setIsConnected(true);
        console.log('MQTT Connected');
      });
      client.on('error', (err: any) => {
        console.error('MQTT Connection error: ', err);
        // client.end();
      });
      client.on('reconnect', () => {
        setIsConnected(true);
      });
      client.on('message', (_topic: string, message: Buffer) => {
        const payloadMessage = { topic: _topic, message: JSON.parse(message.toString()) };
        setPayload(payloadMessage);
      });
    }
  }, [client]);

  return {
    mqttConnect,
    mqttDisconnect,
    mqttSubscribe,
    mqttUnSubscribe,
    payload,
    isConnected,
  };
}
