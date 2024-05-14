"use client";
import { DocumentDuplicateIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { rule } from "../data/generate";
import { toast } from "react-toastify";

export function TextareaRuleOutput(props: any) {
    const [value, setValue] = useState('')

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

    function convertLogoperator(logoperator: string) {
        return logoperator == "" ? "" : " " + logoperator.toLowerCase() + " "
    }

    useEffect(() => {
        const statements = [""]
        for (let i = 0; i < rule.wenn.length; i++) {
            const element = rule.wenn[i];
            const operatorString = convertOperator(element.operator)
            const logoperatorsString = convertLogoperator(element.logoperator)
            const statement = logoperatorsString + "im Datenfeld " + element.field + operatorString + " der Wert " + element.value
            statements.push(statement)
        }

        const aktionsliste = [""]
        for (let i = 0; i < rule.dann.length; i++) {
            const element = rule.dann[i];
            const requiredString = element.required.toString().startsWith("K") ? element.required.toString().replace("K","k") : element.required.toString()
            let logoperatorString = ""
            if (i > 0) {
                logoperatorString  = " sowie "
            }
            const aktion = logoperatorString + element.field + " " + requiredString + " sein und " + element.visibility.toLowerCase() + " werden"
            aktionsliste.push(aktion)
        }

        const statementsString = statements.toString().replaceAll(",", "")
        const aktionslisteString = aktionsliste.toString().replaceAll(",", "")
        const regel = "Wenn " + statementsString + " angegeben wurde, dann soll " + aktionslisteString + "."
        setValue(regel);

    }, [value])

    const handleChange = (event: any) => {
        setValue(event.target.value)
    };

    const handleClick = () => {
        navigator.clipboard.writeText(value)
        toast.success("Text wurde erfolgreich in Ihre Zwischenablage kopiert")
    }

    return (
        <div className="relative">
            <textarea rows={5} id="code" className="form-input block w-full sm:text-sm border-gray-300 h-64 text-black" value={value} onChange={handleChange} />
            <button type="submit" id="btnCopy" className='absolute top-1 right-0 text-gray-400 button-secondary' onClick={handleClick}><DocumentDuplicateIcon className="h-4 w-4" /></button>
        </div>
    )
}