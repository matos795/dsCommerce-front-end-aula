export default function FormTextArea(props: any) {
    const { validation, invalid, dirty, onTurnDirty, ...textareaProps } = props;

    function handleBlur() {
        onTurnDirty(props.name);
    }

    return (
        <textarea
            onBlur={handleBlur}
            {...textareaProps}
            data-invalid={invalid?.toString()}
            data-dirty={dirty?.toString()}
        />
    );
};