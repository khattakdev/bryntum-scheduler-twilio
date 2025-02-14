import { BryntumSchedulerProps } from "@bryntum/scheduler-react";


const schedulerConfig : BryntumSchedulerProps = {
  startDate        : new Date(2022, 2, 20, 6),
  endDate          : new Date(2022, 2, 30, 20),
  eventStyle                : 'rounded',
  zoomOnMouseWheel          : false,
  zoomOnTimeAxisDoubleClick : false,
  fillTicks : true,
  rowHeight        : 50,
  barMargin        : 5,
  multiEventSelect : true,
  resourceImagePath : 'users/',
  filterFeature : true,
  eventResizeFeature : false,

  viewPreset : {
    base      : 'dayAndWeek',
    shiftUnit : 'week',
    headers   : [
        {
            unit       : 'd',
            align      : 'center',
            dateFormat : 'ddd DD'
        }
    ]
},

  columns: [
    {
      type: "resourceInfo",
      text: "Name",
      field: "name",
      minWidth: 190
    },
    {
      text : 'City',
      field : 'city',
      flex : 1,
    }
    
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

  crudManager : {
    eventStore : {
      // modelClass : CustomEventModel,
  },
      transport : {
          load : {
              url : 'data.json'
          }
      },
      autoLoad : true
  }
};

export { schedulerConfig };