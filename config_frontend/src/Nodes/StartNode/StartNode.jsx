import { memo, useCallback } from "react";
import { Handle, Position, getConnectedEdges, useStore } from "reactflow";

import "./StartNode.css";

const selector =
  (nodeId, isConnectable, handleId, maxConnections = 1) =>
  (s) => {
    if (!isConnectable) return false;

    const node = s.nodeInternals.get(nodeId);
    const connectedEdges = getConnectedEdges([node], s.edges);

    const filteredEdges = connectedEdges.filter(
      (edge) => edge.sourceHandle === handleId
    );

    return filteredEdges.length < maxConnections;
  };

const StartNode = ({ data, id, isConnectable }) => {
  const isConnectableStart = useStore(
    useCallback(selector(id, isConnectable, "start"), [id, isConnectable])
  );

  return (
    <>
      <div className="StartNode">START</div>

      <Handle
        id="start"
        className="handle"
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectableStart}
      />
    </>
  );
};

StartNode.displayName = "StartNode";

export default memo(StartNode);
