import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";

import initialNodes from "./nodes";
import initialEdges from "./edges";

const useStore = create((set, get) => ({
  nodes: JSON.parse(localStorage.getItem("policyFlow@nodes")) ?? initialNodes,

  setNodes: (nodes) => {
    set({
      nodes: nodes,
    });
  },

  edges: JSON.parse(localStorage.getItem("policyFlow@edges")) ?? initialEdges,

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          label: connection.sourceHandle.includes("True")
            ? "Yes"
            : connection.sourceHandle.includes("False")
            ? "No"
            : "",
          labelStyle: {
            fontSize: "15px",
          },
          markerEnd: {
            type: "arrow",
            width: "50px",
            height: "25px",
          },
        },
        get().edges
      ),
    });

    set({
      nodes: get().nodes.map((node) => {
        if (node.id === connection.source) {
          node.data[connection.sourceHandle.replace("start", "onTrue")] = connection.target;
        }

        return node;
      }),
    });
  },
  
  updateNodeData: (nodeId, data) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, ...data };
        }

        return node;
      }),
    });
  },
}));

export default useStore;
