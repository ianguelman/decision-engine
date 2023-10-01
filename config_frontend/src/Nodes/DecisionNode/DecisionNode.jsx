import { memo, useCallback, useEffect, useState } from "react";
import { Handle, Position, getConnectedEdges, useStore } from "reactflow";

import useStoreState from "../../store/store";

import "./DecisionNode.css";
import ConfigModalDecision from "../../ConfigModals/ConfigModalDecision/ConfigModelDecision";

const selector =
  (nodeId, isConnectable, handleId, maxConnections = 1) =>
  (s) => {
    if (!isConnectable) return false;

    const node = s.nodeInternals.get(nodeId);
    const connectedEdges = getConnectedEdges([node], s.edges);

    const filteredEdges = connectedEdges.filter(
      (edge) => edge.sourceHandle === handleId && edge.source === nodeId
    );

    return filteredEdges.length < maxConnections;
  };

const DecisionNode = ({ data, id, isConnectable }) => {
  const updateNodeData = useStoreState((state) => state.updateNodeData);

  const isConnectableOnTrue = useStore(
    useCallback(selector(id, isConnectable, "onTrue"), [id, isConnectable])
  );

  const isConnectableOnFalse = useStore(
    useCallback(selector(id, isConnectable, "onFalse"), [id, isConnectable])
  );

  const [propertyName, setPropertyName] = useState(data.propertyName ?? "");
  const [propertyNameError, setPropertyNameError] = useState(false);

  const [comparisonValue, setComparisonValue] = useState(
    data.comparisonValue ?? ""
  );
  const [comparisonValueError, setComparisonValueError] = useState(false);

  const [comparedValue, setComparedValue] = useState(data.comparedValue ?? "");
  const [comparedValueError, setComparedValueError] = useState(false);

  const [open, setOpen] = useState(
    !(data.propertyName && data.comparisonValue && data.comparedValue)
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    const fieldsAreInValid =
      propertyNameError || comparisonValueError || comparedValueError;

    setOpen(fieldsAreInValid);

    if (!fieldsAreInValid) {
      updateNodeData(id, { propertyName, comparisonValue, comparedValue });
    }
  };

  useEffect(() => {
    setPropertyNameError(propertyName === "");
    setComparisonValueError(comparisonValue === "");
    setComparedValueError(comparedValue === "");
  }, [propertyName, comparisonValue, comparedValue]);

  return (
    <>
      <div className="DecisionNode" onClick={handleOpen}>
        {propertyName} {comparisonValue} {comparedValue}
      </div>

      <Handle
        className="handle"
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />

      <Handle
        id="onFalse"
        className="handle onFalseHandle"
        type="source"
        position={Position.Left}
        isConnectable={isConnectableOnFalse}
      />

      <Handle
        id="onTrue"
        className="handle onTrueHandle"
        type="source"
        position={Position.Right}
        isConnectable={isConnectableOnTrue}
      />

      <ConfigModalDecision
        open={open}
        handleClose={handleClose}
        propertyName={propertyName}
        setPropertyName={setPropertyName}
        propertyNameError={propertyNameError}
        comparisonValue={comparisonValue}
        setComparisonValue={setComparisonValue}
        comparisonValueError={comparisonValueError}
        comparedValue={comparedValue}
        setComparedValue={setComparedValue}
        comparedValueError={comparedValueError}
      />
    </>
  );
};

DecisionNode.displayName = "DecisionNode";

export default memo(DecisionNode);
