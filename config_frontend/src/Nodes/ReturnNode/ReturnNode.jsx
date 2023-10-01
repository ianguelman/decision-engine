import { useEffect, memo, useState } from "react";
import { Handle, Position } from "reactflow";

import useStoreState from "../../store/store";

import "./ReturnNode.css";
import ConfigModalReturn from "../../ConfigModals/ConfigModalReturn/ConfigModelReturn";

const ReturnNode = ({ data, id, isConnectable }) => {
  const updateNodeData = useStoreState((state) => state.updateNodeData);

  const [returnValue, setReturnValue] = useState(data.returnValue ?? "");
  const [returnValueError, setReturnValueError] = useState(false);

  const [open, setOpen] = useState(!data.returnValue);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(returnValueError);

    if (!returnValueError) {
      updateNodeData(id, { returnValue });
    }
  };

  useEffect(() => {
    setReturnValueError(returnValue === "");
  }, [returnValue]);

  return (
    <>
      <div className="ReturnNode" onClick={handleOpen}>
        decision={returnValue}
      </div>
      <Handle
        className="handle"
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />

      <ConfigModalReturn
        open={open}
        handleClose={handleClose}
        returnValue={returnValue}
        setReturnValue={setReturnValue}
        returnValueError={returnValueError}
      />
    </>
  );
};

ReturnNode.displayName = "ReturnNode";

export default memo(ReturnNode);
