/** @odoo-module **/

import { DateTimeField, dateTimeField } from '@web/views/fields/datetime/datetime_field';
import { registry } from "@web/core/registry";
import { patch } from "@web/core/utils/patch";
import { useDateTimePicker } from "@web/core/datetime/datetime_hook";
import { Component, onWillRender, useState } from "@odoo/owl";
import { DateTimePicker } from "@web/core/datetime/datetime_picker";

class FsmDateWidget extends DateTimeField {

    setup() {
        const getPickerProps = () => {
            const value = this.getRecordValue();
            /** @type {DateTimePickerProps} */
            const pickerProps = {
                value,
                type: this.field.type,
                range: this.isRange(value),
            };
            if (this.props.maxDate) {
                pickerProps.maxDate = this.parseLimitDate(this.props.maxDate);
            }
            if (this.props.minDate) {
                pickerProps.minDate = this.parseLimitDate(this.props.minDate);
            }
            if (!isNaN(this.props.rounding)) {
                pickerProps.rounding = this.props.rounding;
            }
            pickerProps.current = this.props.record.data.date_order;
            console.log(this.props.test)
            return pickerProps;
        };

        const dateTimePicker = useDateTimePicker({
            target: "root",
            get pickerProps() {
                return getPickerProps();
            },
            onChange: () => {
                this.state.range = this.isRange(this.state.value);
            },
            onApply: () => {
                const toUpdate = {};
                if (Array.isArray(this.state.value)) {
                    // Value is already a range
                    [toUpdate[this.startDateField], toUpdate[this.endDateField]] = this.state.value;
                } else {
                    toUpdate[this.props.name] = this.state.value;
                }
                // when startDateField and endDateField are set, and one of them has changed, we keep
                // the unchanged one to make sure ORM protects both fields from being recomputed by the
                // server, ORM team will handle this properly on master, then we can remove unchanged values
                if (!this.startDateField || !this.endDateField) {
                    // If startDateField or endDateField are not set, delete unchanged fields
                    for (const fieldName in toUpdate) {
                        if (areDatesEqual(toUpdate[fieldName], this.props.record.data[fieldName])) {
                            delete toUpdate[fieldName];
                        }
                    }
                } else {
                    // If both startDateField and endDateField are set, check if they haven't changed
                    if (areDatesEqual(toUpdate[this.startDateField], this.props.record.data[this.startDateField]) &&
                        areDatesEqual(toUpdate[this.endDateField], this.props.record.data[this.endDateField])) {
                        delete toUpdate[this.startDateField];
                        delete toUpdate[this.endDateField];
                    }
                }

                if (Object.keys(toUpdate).length) {
                    this.props.record.update(toUpdate);
                }
            },
        });
        // Subscribes to changes made on the picker state
        this.state = useState(dateTimePicker.state);
        this.openPicker = dateTimePicker.open;

        onWillRender(() => this.triggerIsDirty());
        patch(DateTimePicker.prototype, {
            onWillRender() {
                const { hoveredDate } = this.state;
                const precision = this.activePrecisionLevel;
                const getterParams = {
                    additionalMonth: this.additionalMonth,
                    maxDate: this.maxDate,
                    minDate: this.minDate,
                    showWeekNumbers: this.props.showWeekNumbers ?? !this.props.range,
                    isDateValid: this.props.isDateValid,
                    dayCellClass: this.props.dayCellClass,
                };
                const referenceDate = this.state.focusDate;
                this.title = precision.getTitle(referenceDate, getterParams);
                this.items = precision.getItems(referenceDate, getterParams);
        
                for (var i of this.items[0].weeks){
                    for (var j of i.days){
                        j.isValid=false
                    }
                }
        
                /** Selected Range: current values with hovered date applied */
                this.selectedRange = [...this.values];
                /** Highlighted Range: union of current values and selected range */
                this.highlightedRange = [...this.values];
        
                // Apply hovered date to selected range
                if (hoveredDate) {
                    [this.selectedRange] = this.applyValueAtIndex(hoveredDate, this.props.focusedDateIndex);
                    if (this.props.range && this.selectedRange.every(Boolean)) {
                        this.highlightedRange = [
                            earliest(this.selectedRange[0], this.values[0]),
                            latest(this.selectedRange[1], this.values[1]),
                        ];
                    }
                }
            }
        })
    }
}
FsmDateWidget.props = {
    ...FsmDateWidget.props,
    test: {type: String, optional: true},
};

FsmDateWidget.extractProps = ({attrs, field}) => {
    return {
        // We are looking for attr "background_color", snake case
        test: attrs.test,
    };
};
export const fsmDateWidget = {
    ...dateTimeField,
    component: FsmDateWidget,
    extractProps: ({ attrs }) => {
        return {
            // We are looking for attr "background_color", snake case
            test: attrs.test,
        };
    },
}

registry.category("fields").add('test', fsmDateWidget);
