/* eslint-disable testing-library/no-container, testing-library/no-node-access */
import { ReactFlowProvider } from "reactflow";
import { render } from "@testing-library/react";
import DecisionNode from "./DecisionNode";

describe("DecisionNode", () => {
  it("node displayed value should be its the propertyName followed by the comparisonValue followed by comparedValue", () => {
    const { container } = render(
      <ReactFlowProvider>
        <DecisionNode
          data={{
            propertyName: "test",
            comparisonValue: "==",
            comparedValue: "42",
          }}
        />
      </ReactFlowProvider>
    );

    const displayedValue =
      container.getElementsByClassName("DecisionNode")[0].textContent;

    expect(displayedValue).toEqual("test == 42");
  });
});
