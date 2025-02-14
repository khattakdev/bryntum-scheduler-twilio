import { CrudManagerConfig } from "@bryntum/scheduler";
import { BryntumScheduler } from "@bryntum/scheduler-react";
import { useEffect, useRef, useState } from "react";

export default function Scheduler({ ...props }) {
  const [crudManagerConfig] = useState<Partial<CrudManagerConfig>>({
    loadUrl: "data.json",
    autoLoad: true,
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production.
    validateResponse: true,
  });

  const schedulerRef = useRef<BryntumScheduler>(null);

  useEffect(() => {
    // Bryntum Scheduler instance
    // const scheduler = schedulerRef?.current?.instance;
  }, []);

  return (
    <>
    <BryntumScheduler
      {...props}
      ref={schedulerRef}
      crudManager={crudManagerConfig}
      />
    </>
  );
}