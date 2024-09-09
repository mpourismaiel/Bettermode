import { emojiMap } from "../utils/emojies";

export const Emoji = ({ emoji }: { emoji: keyof typeof emojiMap }) => {
  return (
    <span
      style={{
        fontFamily:
          '"Apple Color Emoji", "Noto Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Twemoji Mozilla", "Android Emoji"',
      }}
    >
      {emojiMap[emoji]}
    </span>
  );
};
