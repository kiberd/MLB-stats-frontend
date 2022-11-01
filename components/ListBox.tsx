import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const indicator = [
  { id: 0, name: "타율", value: "avg" },
  { id: 1, name: "홈런", value: "homeruns" },
  { id: 2, name: "안타", value: "hits" },
  { id: 3, name: "타점", value: "rbi" },
  { id: 4, name: "타석", value: "ab" },
];

interface Indicator {
  id: number;
  name: string;
  value: string;
}

interface IndicatorObjType {
  batting: Indicator[];
  pitching: Indicator[];
}


const indicatorMap: IndicatorObjType = {
  batting: [
    { id: 0, name: "타율", value: "avg" },
    { id: 1, name: "홈런", value: "homeruns" },
    { id: 2, name: "안타", value: "hits" },
    { id: 3, name: "타점", value: "rbi" },
    { id: 4, name: "타석", value: "ab" }, 
  ],
  pitching: [
    { id: 0, name: "승", value: "win" },
    { id: 1, name: "패", value: "lose" },
    { id: 2, name: "방어율", value: "era" },
    { id: 3, name: "피안타", value: "h" },
    { id: 4, name: "피홈런", value: "hr" }, 
  ]
}

interface ListBoxProps {
  onHandleIndicatorChange: any;
  type: string;
}

const ListBox: React.FC<ListBoxProps> = ({ onHandleIndicatorChange, type }) => {

  const [selected, setSelected] = useState<any>(indicatorMap["batting"][0]);

  useEffect(() => {
    setSelected(indicatorMap[type as keyof IndicatorObjType][0]);
  } ,[type]);

  useEffect(() => {
    onHandleIndicatorChange(selected);
  }, [selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative z-0 mt-1">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{selected.name}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronUpDownIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {indicatorMap[type as keyof IndicatorObjType].map((indicator, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={indicator}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {indicator.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ListBox;
