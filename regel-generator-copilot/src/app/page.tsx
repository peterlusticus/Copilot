"use client";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormLineIf } from "./components/formLineIf";
import { FormLineThan } from "./components/formLineThan";
import { FormContainer } from "./components/layout/formContainer";
import { FormItem } from "./components/layout/formItem";
import { Navbar } from "./components/navbar";
import { TextareaRuleOutput } from "./components/textareaRuleOutput";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function Home() {
  const [fieldsForRuleIf, setFieldsForRuleIf] = useState([""]);
  const [fieldsForRuleThen, setFieldsForRuleThen] = useState([""]);
  const [elementsWenn, setElementsWenn] = useState<JSX.Element[]>([]);
  const [idWenn, setIdWenn] = useState(1);
  const [elementsDann, setElementsDann] = useState<JSX.Element[]>([]);
  const [idDann, setIdDann] = useState(1);

  const handleAddWenn = () => {
    const elArr = [...elementsWenn];
    const id = elementsWenn.length + 1;
    elArr.push(<FormLineIf key={id} id={id} elArr={elementsWenn} setEl={setElementsWenn} fields={fieldsForRuleIf} />);
    setElementsWenn(elArr);
    setIdWenn(idWenn + 1);
  };

  const handleAddDann = () => {
    const elArr = [...elementsDann];
    const id = elementsDann.length + 1;
    elArr.push(<FormLineThan key={id} id={id} elArr={elementsDann} setEl={setElementsDann} fields={fieldsForRuleThen} />);
    setElementsDann(elArr);
    setIdDann(idDann + 1);
  };

  return (
    <div>
      <ToastContainer pauseOnFocusLoss={false} autoClose={2500} />
      <Navbar setFieldsForRuleIf={setFieldsForRuleIf} setFieldsForRuleThen={setFieldsForRuleThen} />
      <div className="flex justify-center mx-auto">
        <div className="grow max-w-7xl flex">
          <div className="w-full mr-5">
            <FormContainer>
              <FormItem title="Wenn...">
                <FormLineIf id={0} elArr={elementsWenn} setEl={setElementsWenn} fields={fieldsForRuleIf} />
                <div>{elementsWenn}</div>
                <button type="button" className="mt-5 w-20 h-10 rounded-none bg-green-600 hover:bg-green-500 text-xl text-center text-base text-white " onClick={handleAddWenn}><PlusIcon className="mx-auto h-5 w-5" /></button>
              </FormItem>
            </FormContainer>
          </div>
        </div>
      </div>
      <div className="flex justify-center mx-auto">
        <div className="grow max-w-7xl flex">
          <div className="w-full mr-5">
            <FormContainer>
              <FormItem title="Dann...">
                <FormLineThan id={0} elArr={elementsDann} setEl={setElementsDann} fields={fieldsForRuleThen} />
                <div>{elementsDann}</div>
                <button type="button" className="mt-5 w-20 h-10 rounded-none bg-green-600 hover:bg-green-500 text-xl text-center text-base text-white " onClick={handleAddDann}><PlusIcon className="mx-auto h-5 w-5" /></button>
              </FormItem>
            </FormContainer>
          </div>
        </div>
      </div>
      <div className="flex justify-center mx-auto">
        <div className="grow max-w-7xl flex">
          <div className="w-full mr-5">
            <FormContainer>
              <FormItem title="Textausgabe">
                <TextareaRuleOutput />
              </FormItem>
            </FormContainer>
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-base text-gray-400">&copy; 2024 FSU Jena</p>
    </div>
  );
}
