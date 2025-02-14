import { BryntumSchedulerProps } from "@bryntum/scheduler-react";

const schedulerConfig: BryntumSchedulerProps = {
  startDate: new Date(2024, 2, 21, 6),
  endDate: new Date(2024, 2, 21, 20),
  viewPreset: "hourAndDay",
  eventStyle: "border",
  resourceImagePath : 'users/',
  columns: [
    {
      type: "resourceInfo",
      text: "Name",
      field: "name",
    },
    { text: "City", field: "city" },
  ],
  tbar : {
    items : [
      {
        type: "widget",
        cls: "widget-title",
        html: "Events Scheduler",
        flex: 1,
      },
      {
        type : 'button',
        color : 'b-orange',
        text : 'Add event',
        icon : 'b-fa b-fa-plus',
        onClick : () => {
          // TODO: add new event
          console.log('Add event clicked');
        }
      },
    ]
  },
  stripeFeature: true,
  dependenciesFeature: true,
};

export { schedulerConfig };
