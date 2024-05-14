type Rule = {
    wenn: [{ field: string, operator: string, value: string | number, logoperator: string }],
    dann: [{ field: string, visibility: string, required: string | number }]
}

export const rule: Rule = { wenn: [{ field: "", operator: "", value: "", logoperator: "" }], dann: [{ field: "", visibility: "", required: "" }] }

export const setRuleValue = (prop: string, id: number, order: boolean, value: string) => {
    if (order) {
        if (id >= rule.wenn.length) {
            rule.wenn.push({ field: "", operator: "", value: "", logoperator: "" });
        }
        if (prop == "value") {
            rule.wenn[id].value = value;
        }
        else if (prop == "field") {
            rule.wenn[id].field = value;
        }
        else if (prop == "operator") {
            rule.wenn[id].operator = value;
        }
        else if (prop == "logoperator") {
            rule.wenn[id].logoperator = value;
        }
    } else {
        if (id >= rule.dann.length) {
            rule.dann.push({ field: "", visibility: "", required: "" });
        }
        if (prop == "visibility") {
            rule.dann[id].visibility = value;
        }
        else if (prop == "field") {
            rule.dann[id].field = value;
        }
        else if (prop == "required") {
            rule.dann[id].required = value;
        }
    }
}

export const delRuleValue = (id: number, order: boolean) => {
    //todo delete if id <= rule.legth
    if (order) {
        rule.wenn.splice(id, 1)
    } else {
        rule.dann.splice(id, 1)
    }
}