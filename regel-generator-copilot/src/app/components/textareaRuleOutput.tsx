"use client";
import { DocumentDuplicateIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { rule } from "../data/generate";
import { toast } from "react-toastify";

/**
 * Renders a textarea for displaying and editing a rule output.
 */
export function TextareaRuleOutput() {
    const [value, setValue] = useState('')

    /**
     * Converts the operator string to a human-readable format.
     * @param operator - The operator string to convert.
     * @returns The converted operator string.
     */
    function convertOperator(operator: string) {
        switch (operator) {
            case "==":
                return ""
            case "!=":
                return " nicht"
            case ">":
                return " ein Wert größer als"
            case "<":
                return " ein Wert kleiner als"
            case ">=":
                return " ein Wert größer gleich"
            case "<=":
                return " ein Wert kleiner gleich"
            default:
                return ""
        }
    }

    /**
     * Converts the logical operator string to a human-readable format.
     * @param logoperator - The logical operator to convert.
     * @returns The converted logical operator string.
     */
    function convertLogoperator(logoperator: string) {
        return logoperator == "" ? "" : " " + logoperator.toLowerCase() + " "
    }

    /**
     * Handles the change event of the textarea.
     * @param event - The change event object.
     */
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    }

    /**
     * Handles the click event of the copy button.
     */
    const handleClick = () => {
        navigator.clipboard.writeText(value)
        toast.success("Text wurde erfolgreich in Ihre Zwischenablage kopiert")
    }

    useEffect(() => {
        const statements = rule.wenn.map((element: any) => {
            const operatorString = convertOperator(element.operator);
            const logoperatorsString = convertLogoperator(element.logoperator);
            return logoperatorsString + "im Datenfeld " + element.field + operatorString + " der Wert " + element.value;
        });

        const aktionsliste = rule.dann.map((element: any, index: number) => {
            const requiredString = element.required.toString().startsWith("K") ? element.required.toString().replace("K", "k") : element.required.toString();
            const logoperatorString = index > 0 ? " sowie " : "";
            return logoperatorString + element.field + " " + requiredString + " sein und " + element.visibility.toLowerCase() + " werden";
        });

        const statementsString = statements.join("");
        const aktionslisteString = aktionsliste.join("");
        const regel = "Wenn " + statementsString + " angegeben wurde, dann soll " + aktionslisteString + ".";
        setValue(regel);
    })

    return (
        <div className="relative">
            <textarea rows={5} id="code" className="form-input block w-full sm:text-sm border-gray-300 h-64 text-black" value={value} onChange={handleChange} />
            <button type="submit" id="btnCopy" className='absolute top-1 right-0 text-gray-400 button-secondary' onClick={handleClick}><DocumentDuplicateIcon className="h-4 w-4" /></button>
        </div>
    )
}