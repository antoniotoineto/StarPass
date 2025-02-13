import { useEffect, useState, useCallback } from "react";
import { useAttractions } from "../context/attractionsContext";
import { usePin } from "../context/pinCodeContext";
import api from "../data/api";

interface Queue {
  id: string;
  title: string;
  queuePosition: number;
  estimatedTime: number;
  wave: number;
}

export function useUserQueues() {
  const { attractions } = useAttractions();
  const { pin } = usePin();
  const [userQueues, setUserQueues] = useState<Queue[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchQueues = useCallback (async () => {
    try {
      const response = await api.get(`/filas/filas-usuario/${pin}`);
      const queues = response.data.userQueues;

      if (queues) {
        const processedQueues = queues.map((queue: any) => {
          const attraction = attractions.find((attr) => attr.id === queue.attractionId);
          return {
            id: queue.attractionId,
            title: attraction?.name || "Atração desconhecida",
            queuePosition: queue.queuePosition,
            estimatedTime: parseInt(queue.estimatedTime, 10),
            wave: queue.wave,
          };
        });

        processedQueues.sort((a: any, b: any) => a.estimatedTime - b.estimatedTime);

        setUserQueues(processedQueues);
        setIsEmpty(processedQueues.length === 0);
      } else {
        setIsEmpty(true);
      }
    } catch (error: any) {
      console.error("Erro ao buscar atrações:", error.message);
    }
  }, [userQueues]);

  return { userQueues, isEmpty, fetchQueues };
}
