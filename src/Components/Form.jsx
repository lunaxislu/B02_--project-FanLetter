import React, { useRef, useId, memo } from "react";
import uuid from "react-uuid";
import {
  StForm,
  StFormContainer,
  StButton,
  StInputLabel,
  StInputContainer,
  StInput,
} from "../styledComponents/StyledForm";
import {
  useCustomContex,
  useCustomTabValueContext,
  useCustomTabActionsContext,
} from "../context/ContextAPI";
function Form() {
  console.log("Form : Render");
  const { lists, setLists, setLocalStorageItem, theme } = useCustomContex();

  const tab = useCustomTabValueContext();
  const actions = useCustomTabActionsContext();
  const character = theme.character;
  const formRef = useRef({});
  const inputLabelNameId = useId();
  const inputLabelTextId = useId();
  const selectLabelId = useId();

  const checkValidForm = () => {
    const name = formRef.name;
    const text = formRef.text;

    if (name.value.trim() === "") return;
    if (text.value.trim() === "") return;

    setFanLetterData(name, text);
  };
  const setFanLetterData = (checkedName, checkedText) => {
    if (lists[formRef.target.value] === undefined) {
      lists[formRef.target.value] = [];
    }
    const letter = {
      id: uuid(),
      name: checkedName.value,
      text: checkedText.value,
      date: new Date().toString(),
      target: formRef.target.value,
    };
    lists[formRef.target.value].unshift(letter);
    setLists({ ...lists });
    setLocalStorageItem();
    checkedName.value = "";
    checkedText.value = "";
  };
  return (
    <StFormContainer>
      <StForm>
        <StInputContainer>
          <StInputLabel htmlFor={inputLabelNameId}>nickName</StInputLabel>
          <StInput
            ref={(ref) => {
              formRef["name"] = ref;
            }}
            id={inputLabelNameId}
            placeholder="20자만"
          />
        </StInputContainer>
        <StInputContainer>
          <StInputLabel htmlFor={inputLabelTextId}>Letter</StInputLabel>
          <StInput
            ref={(ref) => (formRef["text"] = ref)}
            id={inputLabelTextId}
            as="textarea"
            maxLength={100}
            placeholder="100자만"
          />
        </StInputContainer>
        <StInputContainer>
          <StInputLabel htmlFor={selectLabelId} $select>
            누구에게 보낼건가요??
          </StInputLabel>
          <StInput
            ref={(ref) => (formRef["target"] = ref)}
            as="select"
            id={selectLabelId}
            value={tab}
            onChange={actions.eventChangeTab}
          >
            {character.map((item, i) => (
              <StInput key={uuid()} as="option" value={item}>
                {item}
              </StInput>
            ))}
          </StInput>
        </StInputContainer>
        <StButton onClick={checkValidForm}>보내기</StButton>
      </StForm>
    </StFormContainer>
  );
}

export default memo(Form);
