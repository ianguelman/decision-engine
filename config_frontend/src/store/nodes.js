const initialNodes = [
  {
    id: "9ca89130-225a-4d05-9c50-161863b28511",
    type: "start",
    position: { x: 400, y: 100 },
    data: { label: "START", onTrue: "56ce727e-c15a-ß4e7c-b05f-aa9837f6be25" },
    width: 110,
    height: 70,
    selected: false,
    dragging: false,
    deletable: false,
  },
  {
    id: "56ce727e-c15a-ß4e7c-b05f-aa9837f6be25",
    type: "decision",
    position: { x: 360, y: 300 },
    data: {
      label: "2",
      propertyName: "age",
      comparisonValue: ">",
      comparedValue: "18",
      onTrue: "00ddd4bd-ce8b-4a2f-aa48-d7f5aadd039a",
      onFalse: "1c9dfb8f-3f51-4ced-b60f-9f59cc89d4c9",
    },
    width: 190,
    height: 110,
    selected: false,
    dragging: false,
  },
  {
    id: "3eb9e4a5-fb71-4e27-bd5b-588864312811",
    type: "return",
    position: { x: 880, y: 690 },
    data: { returnValue: "true" },
    width: 110,
    height: 70,
    selected: false,
    positionAbsolute: { x: 880, y: 690 },
    dragging: false,
  },
  {
    id: "1c9dfb8f-3f51-4ced-b60f-9f59cc89d4c9",
    type: "return",
    position: { x: 160, y: 500 },
    data: { returnValue: "false" },
    width: 110,
    height: 70,
  },
  {
    id: "00ddd4bd-ce8b-4a2f-aa48-d7f5aadd039a",
    type: "decision",
    position: { x: 620, y: 500 },
    data: {
      propertyName: "income",
      comparisonValue: ">",
      comparedValue: "1000",
      onTrue: "3eb9e4a5-fb71-4e27-bd5b-588864312811",
      onFalse: "b3be66f8-c83b-4627-97eb-3c0865269ff9",
    },
    width: 190,
    height: 110,
    selected: false,
    positionAbsolute: { x: 620, y: 500 },
    dragging: false,
  },
  {
    id: "b3be66f8-c83b-4627-97eb-3c0865269ff9",
    type: "return",
    position: { x: 470, y: 690 },
    data: { returnValue: "false" },
    width: 110,
    height: 70,
    selected: false,
    positionAbsolute: { x: 470, y: 690 },
    dragging: false,
  },
];

export default initialNodes;
