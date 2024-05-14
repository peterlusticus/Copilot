import { Combobox } from '@headlessui/react'
import { CalculatorIcon, ListBulletIcon, PencilIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { Rule, setRuleValue } from '../data/generate'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

/**
 * AutocompleteInput component.
 * 
 * @param props - The component props.
 * @param props.items - An array of strings representing the available items for autocomplete.
 * @param props.prop - A string representing the key for rule object.
 * @param props.id - A number representing the id value.
 * @returns The AutocompleteInput component.
 */
export function AutocompleteInput(props: {items: string[], prop: keyof Rule["wenn"][number] | keyof Rule["dann"][number], id: number}) {
    const [selectedField, setSelectedField] = useState('')
    const [query, setQuery] = useState('')
    const [selectedDatatype, setSelectedDatatype] = useState("string")

    if(selectedField){
        setRuleValue(props.prop, props.id, true, selectedField)
    }

    const filteredFileds =
        query === ''
            ? props.items
            : props.items.filter((field) => {
                return field.toLowerCase().includes(query.toLowerCase())
            })

    useEffect(() => {
        if (filteredFileds.indexOf(selectedField) == 0) {
            setSelectedDatatype("list")
        } else if (isNaN(Number(selectedField)) || selectedField == '') {
            setSelectedDatatype("string")
        } else {
            setSelectedDatatype("number")
        }
    }, [selectedField]);

    return (
        <Combobox value={selectedField} onChange={setSelectedField}>
            <div className="relative w-full">
                <Combobox.Input onChange={(event) => setQuery(event.target.value)} displayValue={(person) => selectedField} className="relative w-full rounded-none border border-gray-300 bg-white text-left outline-none form-dropdown form-input cursor-text" />
                {selectedDatatype == "list" && <div className="pointer-events-none absolute inset-y-0 right-0 ml-3 mt-2.5 items-center pr-2"> <ListBulletIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> </div>}
                {selectedDatatype == "string" && <div className="pointer-events-none absolute inset-y-0 right-0 ml-3 mt-2.5 items-center pr-2"> <PencilIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> </div>}
                {selectedDatatype == "number" && <div className="pointer-events-none absolute inset-y-0 right-0 ml-3 mt-2.5 items-center pr-2"> <CalculatorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> </div>}
                <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-none bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {query.length > 0 && (
                        <Combobox.Option value={query} hidden />
                    )}
                    {filteredFileds.map((field) => (
                        <Combobox.Option key={field} value={field} className={({ active }) =>
                            classNames(
                                active ? 'text-white bg-green-600' : 'text-gray-900',
                                'relative cursor-pointer select-none rounded-none py-2 pl-3 pr-9'
                            )
                        }>
                            {field}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </div>
        </Combobox>
    )
}
