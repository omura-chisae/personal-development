import { useState, useCallback } from "react";
import { Diary } from "./../../Types/Diary";

type Props = {
  targetDate: string;
  diaries: Array<Diary>;
};

export const useSelectDiary = () => {
  const [selectedDiary, setSelectedDiary] = useState<Diary>();

  const onSelectDiary = useCallback((props: Props) => {
    const { targetDate, diaries } = props;
    // console.log(targetDate);
    // console.log(diaries);
    const targetDiary = diaries.find((diary) => diary.date === targetDate);

    setSelectedDiary(targetDiary);
  }, []);
  return { onSelectDiary, selectedDiary };
};
