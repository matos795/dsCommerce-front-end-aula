import Select from 'react-select';

export default function FormSelect(props: any) {
    const { className, validation, invalid, dirty, onTurnDirty, ...selectProps } = props;

    function handleBlur() {
        onTurnDirty(props.name);
    }

    return (
        <div
            className={className}
            data-invalid={invalid?.toString()}
            data-dirty={dirty?.toString()}
        >
            <Select
                onBlur={handleBlur}
                {...selectProps}
            />
        </div>

    );
};