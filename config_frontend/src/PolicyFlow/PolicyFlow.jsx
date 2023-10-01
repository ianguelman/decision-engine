import React, { useEffect, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Panel,
  useViewport,
  ReactFlowProvider,
} from "reactflow";

import { v4 as uuidv4 } from "uuid";

import { shallow } from "zustand/shallow";

import useStore from "../store/store";

import "reactflow/dist/style.css";

import DecisionNode from "../Nodes/DecisionNode/DecisionNode";
import StartNode from "../Nodes/StartNode/StartNode";
import { Button, ButtonGroup } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PublishIcon from "@mui/icons-material/Publish";
import ReturnNode from "../Nodes/ReturnNode/ReturnNode";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

function Flow() {
  const { nodes, setNodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useStore(selector, shallow);

  const { x, y } = useViewport();

  useEffect(() => {
    localStorage.setItem("policyFlow@nodes", JSON.stringify(nodes));
    localStorage.setItem("policyFlow@edges", JSON.stringify(edges));
  }, [nodes, edges]);

  const nodeTypes = useMemo(
    () => ({ decision: DecisionNode, start: StartNode, return: ReturnNode }),
    []
  );

  const createNode = (type) =>
    setNodes([
      ...nodes,
      {
        id: uuidv4(),
        type: type,
        position: { x: -x + 200, y: -y + 200 },
        data: {},
      },
    ]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Panel position="top-right">
          <Button variant="contained" startIcon={<PublishIcon />}>
            Publish Policy
          </Button>
        </Panel>

        <Panel position="top-left">
          <ButtonGroup variant="contained" orientation="vertical">
            <Button
              startIcon={<AddIcon />}
              onClick={() => createNode("decision")}
            >
              Add decision block
            </Button>

            <Button
              startIcon={<AddIcon />}
              onClick={() => createNode("return")}
            >
              Add return block
            </Button>
          </ButtonGroup>
        </Panel>

        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default function PolicyFlow(props) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
}
