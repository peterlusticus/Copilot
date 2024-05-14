export type Rule = {
    wenn: { field: string; operator: string; value: string | number; logoperator: string }[];
    dann: { field: string; visibility: string; required: string }[];
};

export const rule: Rule = {
    wenn: [{ field: "", operator: "", value: "", logoperator: "" }],
    dann: [{ field: "", visibility: "", required: "" }],
};

/**
 * Sets the value of a property in the "wenn" or "dann" array of the Rule object.
 * 
 * @param prop - The property to set the value for. Can be a key of the "wenn" or "dann" array.
 * @param id - The index of the element in the "wenn" or "dann" array.
 * @param order - A boolean value indicating whether the property belongs to the "wenn" array (true) or the "dann" array (false).
 * @param value - The value to set for the property.
 */
export const setRuleValue = (prop: keyof Rule["wenn"][number] | keyof Rule["dann"][number], id: number, order: boolean, value: string) => {
    const targetArray = order ? rule.wenn : rule.dann

    if (order) {
        if (id >= rule.wenn.length) {
            rule.wenn.push({ field: "", operator: "", value: "", logoperator: "" });
        }
        (rule.wenn[id] as { [key: string]: string })[prop] = value;
    } else {
        if (id >= rule.dann.length) {
            rule.dann.push({ field: "", visibility: "", required: "" });
        }
        (rule.dann[id] as { [key: string]: string })[prop] = value;
    }
}


/**
 * Deletes a rule value from the specified array based on the given id and order.
 * @param id - The id of the rule value to be deleted.
 * @param order - A boolean indicating whether the rule value is from the "wenn" array (true) or the "dann" array (false).
 */
export const delRuleValue = (id: number, order: boolean) => {
    const targetArray = order ? rule.wenn : rule.dann;
    targetArray.splice(id, 1);
};
