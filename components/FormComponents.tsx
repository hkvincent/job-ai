import { Control } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type CustomFormFieldProps = {
  name: string;
  control: Control<any>;
};

export function CustomFormField({ name, control }: CustomFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-gray-500 capitalize'>{name}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type CustomFormSelectProps = {
  name: string;
  control: Control<any>;
  items: string[];
  labelText?: string;
};

export function CustomFormSelect({
  name,
  control,
  items,
  labelText,
}: CustomFormSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className='text-gray-500 capitalize'>{labelText || name}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {items.map((item) => {
                  return (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

type CustomFormDatePickerProps = {
  name: string;
  control: Control<any>;
  type: string;
  labelText?: string;
};


export function CustomFormDatePicker({ name, control, type, labelText }: CustomFormDatePickerProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-4">
          <label htmlFor={labelText} className="block mb-3 text-sm font-medium text-gray-500 capitalize">
            {labelText}
          </label>
          <div className="mt-1">
            {type === 'date' ? (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date: any) => field.onChange(date)}
                className="appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                dateFormat="MMMM d, yyyy"
              />
            ) : (
              <input
                {...field}
                id={name}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
        </div>
      )}
    />
  );
}
