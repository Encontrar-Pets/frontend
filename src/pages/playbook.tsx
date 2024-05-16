import Button from "components/button";
import Input from "components/input";
import { useState } from "react";

export default function Playbook() {
  const [dummyInput, setDummyInput] = useState("");

  return (
    <div className="flex flex-col justify-center">
        <Button
          label={"Primary Button"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          type="filled"
          variant="primary"
        ></Button>
        <Button
          label={"Secondary Button"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          type="filled"
          variant="secondary"
        ></Button>
        <Button
          label={"Tertiary Button"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          type="filled"
          variant="tertiary"
        ></Button>
        <Button
          label={"Outlined Primary Button"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          type="outline"
          variant="primary"
        ></Button>
        <Button
          label={"Outlined Secondary Button"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          type="outline"
          variant="secondary"
        ></Button>
        <Button
          label={"Outlined Tertiary Button"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          type="outline"
          variant="tertiary"
        ></Button>
        <Button
          label={"Text Button"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          type="text"
        ></Button>
        <Input placeholder={"Input"} value={dummyInput} onChange={(e) => setDummyInput(e)}></Input>
    </div>
  );
}
