import { Dialog, Transition } from '@headlessui/react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react';
import { DropdownXml } from './dropdownXml';
import { toast } from 'react-toastify';
import { FormItem } from './layout/formItem';

import React from 'react'
import Dropzone from 'react-dropzone'



export function UpdateFileModal(props: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, setFieldsForRuleIf: Dispatch<SetStateAction<string[]>>, setFieldsForRuleThen: Dispatch<SetStateAction<string[]>> }) {
  const cancelButtonRef = useRef(null)

  // State to store uploaded file
  const [file, setFile] = useState<File>();

  const [fieldsFromXML, setFieldsFromXML] = useState<{ label: string, xml: ChildNode }[]>([{ label: "Bitte wählen", xml: document.createElement('div') }]);
  const [selectedValueFromXML, setSelectedValueFromXML] = useState<{ label: string, xml: ChildNode }>({ label: "Bitte wählen", xml: document.createElement('div') });

  const [selectedValueFromXML2, setSelectedValueFromXML2] = useState<{ label: string, xml: ChildNode }>({ label: "Bitte wählen", xml: document.createElement('div') });
  const [fieldsFromXML2, setFieldsFromXML2] = useState<{ label: string, xml: ChildNode }[]>([{ label: "Bitte wählen", xml: document.createElement('div') }]);

  // Upload file on change
  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  // Handle file upload event and update state
  function handleChange(file: any) {
    setFile(file);
    toast.success("XML-Datei erfolgreich hochgeladen!")
  }

  // Read file data after upload
  const handleUpload = () => {
    let reader = new FileReader();
    reader.onload = () => setEbene1(reader.result == undefined ? "" : String(reader.result));
    reader.readAsText(file == undefined ? new File([""], "") : file);
  }

  // Parse XML-content for selection of Datenfeldgruppe
  function setEbene1(content: string) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(content, 'text/xml');

    let fieldGroupArr: { label: string, xml: ChildNode }[] = [];

    xml.getElementsByTagName("xdf:stammdatenschema")[0].childNodes.forEach(node1 => {
      if (node1.nodeName == "xdf:struktur") {
        node1.childNodes.forEach(node2 => {
          if (node2.nodeName == "xdf:enthaelt") {
            node2.childNodes.forEach(node3 => {
              if (node3.nodeName == "xdf:datenfeldgruppe") {
                node3.childNodes.forEach(node4 => {
                  if (node4.nodeName == "xdf:name") {
                    if (node4.textContent !== null) {
                      fieldGroupArr.push({ label: node4.textContent, xml: node3 })
                    }
                  }
                })
              }
            })
          }
        });
      }
    })

    fieldGroupArr.push({ label: "aKein Filter", xml: xml.childNodes[0] })

    // sort select options alphabetically and replace "aKein Filter"
    fieldGroupArr = fieldGroupArr.sort(function (a, b) {
      let x = a.label.toLowerCase();
      let y = b.label.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });
    const idxKeinFilter = fieldGroupArr.findIndex(obj => obj.label == "aKein Filter")
    fieldGroupArr[idxKeinFilter] = { label: "Kein Filter", xml: fieldGroupArr[idxKeinFilter].xml };

    setFieldsFromXML(fieldGroupArr)
  };

  const setEbene2 = (event: any) => {
    const selectedGroup = event
    let groupsInSelectedGroup: { label: string; xml: ChildNode; }[] = []
    //get all groups in selectedGrup and write it into fieldsFromXML2
    const elements = selectedGroup.xml.getElementsByTagName("xdf:datenfeldgruppe")
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const name = element.getElementsByTagName("xdf:name")[0].textContent;
      if (name !== null) {
        groupsInSelectedGroup.push({ label: name, xml: element })
      }
    }

    groupsInSelectedGroup.push({ label: "aKein Filter", xml: document.createElement('div') })

    // sort select options alphabetically and replace "aKein Filter"
    groupsInSelectedGroup = groupsInSelectedGroup.sort(function (a, b) {
      let x = a.label.toLowerCase();
      let y = b.label.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });
    const idxKeinFilter = groupsInSelectedGroup.findIndex(obj => obj.label == "aKein Filter")
    groupsInSelectedGroup[idxKeinFilter] = { label: "Kein Filter", xml: groupsInSelectedGroup[idxKeinFilter].xml };
    setFieldsFromXML2(groupsInSelectedGroup)
    setSelectedValueFromXML2({ label: "Bitte wählen", xml: document.createElement('div') })
    setSelectedValueFromXML(selectedGroup)
  }

  // Update Datenfelder for selection in rule, based on selected Datenfeldgrupe
  useEffect(() => {
    if (selectedValueFromXML) {
      const fieldArrIf: string[] = [];
      const fieldArrThen: string[] = [];

      let fields = selectedValueFromXML.xml.childNodes[0]?.parentElement?.getElementsByTagName("xdf:id");

      if (!selectedValueFromXML2.label.includes("Bitte wählen") && !selectedValueFromXML2.label.includes("Kein Filter")) {
        fields = selectedValueFromXML2.xml.childNodes[0]?.parentElement?.getElementsByTagName("xdf:id");
      }

      if (fields) {
        for (let i = 0; i < fields.length; i++) {
          const content = fields[i].textContent;
          if (content) {
            fieldArrThen.push(content);
            if (content.startsWith("F")) {
              fieldArrIf.push(content);
            }
          }
        }
        props.setFieldsForRuleIf(fieldArrIf);
        props.setFieldsForRuleThen(fieldArrThen);
      }
    }
  }, [selectedValueFromXML, selectedValueFromXML2]);

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={props.setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-auto sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div className="sm:block sm:items-start">
                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                  XML-Datei einlesen
                </Dialog.Title>
                <div className="mt-3 text-center sm:mt-0 sm:text-left ">
                  <div className="mt-2 mx-0">
                    <div className="flex flex-col w-full">
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <Dropzone onDrop={acceptedFiles => handleChange(acceptedFiles[0])}>
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="text-center justify-center">
                                  <ArrowUpTrayIcon className="h-5 w-5 text-gray-400 mx-auto" />
                                  <div className="mt-4 flex text-sm leading-6 text-gray-600 ">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white font-semibold text-indigo-600 text-base hover:text-indigo-500 mx-auto">
                                      <span className=''>{!file && "XML-Datei hochladen"}{file && "XML-Datei aktualisieren"}</span>
                                    </label>
                                  </div>
                                  <p className="text-xs leading-5 text-gray-600">.XML-Datei bis maximal 10MB</p>
                                </div>
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-5'>
                <div className="relative py-5">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-white text-base font-medium text-gray-900">Weitere Einstellungen</span>
                  </div>
                </div>
                <FormItem width="1/4" title="Ebene 1 - Filter nach Datenfeldgruppen">
                  <DropdownXml items={fieldsFromXML} value={selectedValueFromXML} onChange={(event: any) => setEbene2(event)} />
                </FormItem>
                <FormItem width="1/4" title="Ebene 2 - Filter nach Datenfeldgruppen">
                  <DropdownXml items={fieldsFromXML2} value={selectedValueFromXML2} onChange={setSelectedValueFromXML2} />
                </FormItem>
              </div>
              <div className="mt-5 sm:mt-6">
                <button type="button" className="inline-flex justify-center w-full rounded-none border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:text-sm" onClick={() => props.setOpen(false)}                >Fertig </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}