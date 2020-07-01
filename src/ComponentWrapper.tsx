import React, { FunctionComponent } from "react";
import { Message } from "./App";

interface Props {
  message?: Message;
  children: React.ReactNode;
}

const ComponentWrapper: FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      {props.children}
      <h3>{props.message?.text}</h3>
    </>
  );
};

export default ComponentWrapper;
