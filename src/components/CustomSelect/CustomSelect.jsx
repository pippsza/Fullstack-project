import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Svg from "../Svg/svg";
import css from "./CustomSelect.module.css";

export const CustomSelect = ({ label, options, selected, onChange }) => (
  <div className={css.divCustomSelect}>
    <Listbox value={selected} onChange={onChange}>
      <div className={css.divButton}>
        <Listbox.Button className={css.listboxButton}>
          <span className={css.btnSpan1}>{selected || label}</span>
          <span className={css.btnSpan2}>
            <Svg styles={css.svg} name={"dropDownArrow"}></Svg>
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className={css.listboxOptions}>
            {options.map((option) => (
              <Listbox.Option
                key={option._id}
                value={option}
                className={css.option}
              >
                {option.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  </div>
);
