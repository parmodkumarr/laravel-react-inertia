import React from 'react';
import Select from 'react-select';

const SelectInput = ({
    id,
    name,
    value,
    onChange,
    options,
    multiple = false,
    className = '',
    required = false,
    placeholder = 'Select...'
}) => {
    // Transform options to react-select format
    const selectOptions = options.map(option => ({
        value: option.id,
        label: option.name
    }));

    // Transform value to react-select format
    const selectValue = multiple
        ? value.map(v => selectOptions.find(option => option.value === v))
        : selectOptions.find(option => option.value === value);

    const handleChange = (selectedOption) => {
        if (multiple) {
            // For multiple select, extract values from selected options
            const selectedValues = selectedOption ? selectedOption.map(option => option.value) : [];
            onChange({ target: { value: selectedValues } });
        } else {
            // For single select, extract value from selected option
            const selectedValue = selectedOption ? selectedOption.value : null;
            onChange({ target: { value: selectedValue } });
        }
    };

    return (
        <Select
            id={id}
            name={name}
            isMulti={multiple}
            value={selectValue}
            onChange={handleChange}
            options={selectOptions}
            className={className}
            placeholder={placeholder}
            required={required}
            classNamePrefix="select"
            styles={{
                control: (base) => ({
                    ...base,
                    minHeight: '42px',
                    borderColor: '#D1D5DB',
                    '&:hover': {
                        borderColor: '#6366F1'
                    }
                }),
                option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                        ? '#6366F1'
                        : state.isFocused
                            ? '#EEF2FF'
                            : 'white',
                    color: state.isSelected ? 'white' : '#374151',
                    '&:hover': {
                        backgroundColor: state.isSelected ? '#6366F1' : '#EEF2FF'
                    }
                })
            }}
        />
    );
};

export default SelectInput;
