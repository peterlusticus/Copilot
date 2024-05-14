import React, { useCallback, useState } from "react";
import Flowchart from "flowchart-react";
import { ConnectionData, NodeData } from "flowchart-react/dist/schema";

export function FlowchartComp(props: any)  {
  const [nodes, setNodes] = useState<NodeData[]>([
    {
      type: "start",
      title: "Start",
      x: 50,
      y: 240,
      id: 1604410569920
    },
    {
      type: "end",
      title: "End",
      x: 570,
      y: 240,
      id: 1604410572363
    },
    {
      x: 400,
      y: 240,
      id: 1604410575428,
      title: "Joyce",
      type: "operation"
    },
    {
      x: 230,
      y: 240,
      id: 1604410591865,
      title: () => {
        return "Is leader";
      },
      type: "decision"
    }
  ]);
  const [conns, setConns] = useState<ConnectionData[]>([
    {
      source: { id: 1604410569920, position: "right" },
      destination: { id: 1604410591865, position: "left" },
      type: "success",
      title: "1"
    },
    {
      source: { id: 1604410575428, position: "right" },
      destination: { id: 1604410572363, position: "left" },
      type: "success",
      title: "3"
    },
    {
      source: { id: 1604410591865, position: "right" },
      destination: { id: 1604410575428, position: "left" },
      title: "2",
      type: "fail"
    },
    {
      source: { id: 1604410591865, position: "bottom" },
      destination: { id: 1604410572363, position: "bottom" },
      title: "2",
      type: "success"
    }
  ]);

  const handleCreateNode = useCallback(
    (event: any, zoom: any) => {
      const point = {
        x: event.nativeEvent.offsetX / zoom,
        y: event.nativeEvent.offsetY / zoom,
        id: +new Date()
      };
      let nodeData: NodeData;
      if (!nodes.find((item) => item.type === "start")) {
        nodeData = {
          type: "start",
          title: "Start",
          ...point
        };
      } else if (!nodes.find((item) => item.type === "end")) {
        nodeData = {
          type: "end",
          title: "End",
          ...point
        };
      } else {
        nodeData = {
          ...point,
          title: "New",
          type: "operation"
        };
      }
      setNodes((prevState) => [...prevState, nodeData]);
    },
    [nodes]
  );

  return (
    <Flowchart
      showToolbar={["start-end", "operation", "decision"]}
      onChange={(nodes, connections) => {
        setNodes(nodes);
        setConns(connections);
      }}
      onDoubleClick={handleCreateNode}
      style={{ width: 375, height: 295 }}
      nodes={nodes}
      connections={conns}
    />
  );
};