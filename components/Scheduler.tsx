import { BryntumScheduler } from "@bryntum/scheduler-react";
import { useEffect, useRef } from "react";

export default function Scheduler({ ...props }) {

  const schedulerRef = useRef<BryntumScheduler>(null);

  useEffect(() => {
    console.log(props)
    // Bryntum Scheduler instance
    // const scheduler = schedulerRef?.current?.instance;
  }, []);

  return (
    <>
    <BryntumScheduler
      {...props}
      ref={schedulerRef}
      />
    </>
  );
}