import React, { FunctionComponent } from "react";
import { Message } from "./App";

interface Props {
  message?: Message;
  children: React.ReactNode;
}

const ComponentWrapper: FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <h1>My recipe database</h1>
      {props.children}
      <h3>{props.message?.text}</h3>
    </>
  );
};

export default ComponentWrapper;
