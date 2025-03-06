import { useEffect, useState } from "react";

const CHAR_PAD = 100;

const getIndex = (text: string, word: string) => {
  const regex = new RegExp(`\\b${word}\\b`);
  const { index } = regex.exec(text.toLowerCase())!;
  return index;
};

const getBeforeWord = (index: number, text: string) => {
  const leftPad = Math.min(CHAR_PAD, index);
  return text.slice(index - leftPad, index);
};

const getDisplayWord = (index: number, text: string, word: string) => {
  return text.slice(index, index + word.length);
};

const getAfterWord = (index: number, text: string, word: string) => {
  const endIndex = index + word.length;
  const remainingChars = text.length - endIndex;
  const rightPad = Math.min(CHAR_PAD, remainingChars);
  return text.slice(endIndex, endIndex + rightPad);
};

export function PostCard({
  postText,
}: {
  postText: { word: string; text: string };
}) {
  const [textData, setTextData] = useState({
    word: "",
    beforeWord: "",
    afterWord: "",
    text: "",
  });

  useEffect(() => {
    if (!postText.text) return;
    console.log(postText);
    const { word, text } = postText;
    const index = getIndex(text, word);
    const beforeWord = getBeforeWord(index, text);
    const displayWord = getDisplayWord(index, text, word);
    const afterWord = getAfterWord(index, text, word);
    setTextData({ word: displayWord, beforeWord, afterWord, text });
  }, [postText]);

  return (
    <div className="post-card">
      <span className="post-card-item left">{textData.beforeWord}</span>
      <span className="post-card-item center"> {textData.word}</span>
      <span className="post-card-item right">{textData.afterWord}</span>
    </div>
  );
}
