export default function FormInput(props: any) {
    const { validation, invalid, dirty, onTurnDirty, ...inputProps } = props;

    function handleBlur() {
        onTurnDirty(props.name);
    }

    return (
        <input
            onBlur={handleBlur}
            {...inputProps}
            data-invalid={invalid?.toString()}
            data-dirty={dirty?.toString()}
        />
    );
};