import { useState, useEffect, useRef } from 'react';
import * as StompJs from '@stomp/stompjs';
import useUser from '@/store/index';

const baseWSUrl = import.meta.env.VITE_WS_URL;
const prePix = '/queue/device-response/';

export default function useMqtt() {
  const clientRef = useRef(null) as any;
  const [isConnected, setIsConnected] = useState(false);
  const [payload, setPayload] = useState({}) as any;

  const mqttSubscribe = async (topic: string) => {
    if (clientRef.current) {
      clientRef.current.subscribe(topic, (greeting: any) => {
        const payloadMessage = { topic, message: JSON.parse(greeting.body) };
        console.log('payloadMessage', payloadMessage);
        setPayload(payloadMessage);
      });
    }
  };

  const mqttConnect = async (deviceId: string) => {
    const WSURL = `${baseWSUrl}/ws/device/id/${deviceId}`;
    const topic = `${prePix}${deviceId}`;
    const token = useUser.getState().token;

    const stompClient = new StompJs.Client({
      brokerURL: WSURL,
      reconnectDelay: 30* 1000, // 30s 重连
      connectHeaders: {
        token: token,
      },
      onConnect: () => {
        console.log('websocket connected');
        setIsConnected(true);
        mqttSubscribe(topic);
      },
    });
    console.log('stompClient', stompClient);
    clientRef.current = stompClient;
    await stompClient.activate();
  };

  const mqttUnSubscribe = async () => {
    if (clientRef.current) {
      clientRef.current.unsubscribe();
    }
  };

  const mqttDisconnect = async () => {
    if (clientRef.current) {
      mqttUnSubscribe();
      await clientRef.current.deactivate();
      setIsConnected(false);
      console.log('disconnet websockt');
    }
  };

  useEffect(() => {
    return () => {
      mqttDisconnect();
    };
  }, []);

  useEffect(() => {
    if (clientRef.current) {
      clientRef.current.onWebSocketError = (error: any) => {
        console.log('Error with websocket', error);
      };
      clientRef.current.onDisconnect = (error: any) => {
        console.log('websocket onDisconnect ',error);
      };
      clientRef.current.onStompError = (frame: any) => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      };
    }
  }, [clientRef.current]);

  return {
    mqttConnect,
    mqttDisconnect,
    mqttSubscribe,
    mqttUnSubscribe,
    payload,
    isConnected,
  };
}
