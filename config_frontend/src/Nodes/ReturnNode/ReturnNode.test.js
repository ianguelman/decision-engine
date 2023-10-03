/* eslint-disable testing-library/no-container, testing-library/no-node-access */
import { ReactFlowProvider } from "reactflow";
import { render } from "@testing-library/react";
import ReturnNode from "./ReturnNode";

describe("ReturnNode", () => {
  it("node displayed value should be its return value", () => {
    const { container } = render(
      <ReactFlowProvider>
        <ReturnNode data={{ returnValue: "true" }} />
      </ReactFlowProvider>
    );

    const displayedValue =
      container.getElementsByClassName("ReturnNode")[0].textContent;

    expect(displayedValue).toEqual("decision=true");
  });
});
