import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import DefaultInput from "@/components/form/input/DefaultInput";
import ErrMsg from "@/components/form/etc/ErrMsg";

export interface IFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: string;
  rules?: RegisterOptions;
  prefixIcon?: React.ReactNode | null;
  suffixIcon?: React.ReactNode | null;
}

const FormInput = ({
  field,
  rules,
  suffixIcon = null,
  prefixIcon = null,
  ...rest
}: IFormInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  if (errors[field]) {
    // console.log(errors[field]?.message, "errors");
  }
  return (
    <Controller
      name={field}
      control={control}
      defaultValue={""}
      rules={rules}
      render={({ field: controlField }) => {
        return (
          <>
            <DefaultInput
              {...controlField} // ref 전달해서 err필드 감지
              name={controlField.name}
              suffixIcon={suffixIcon}
              prefixIcon={prefixIcon}
              value={controlField.value ?? ""}
              onChange={controlField.onChange}
              onBlur={controlField.onBlur}
              {...rest}
            />

            {errors[field] && <ErrMsg msg={String(errors[field]?.message)} />}
          </>
        );
      }}
    />
  );
};

export default FormInput;
