interface IProps {
  text: string;
  onClick: Function;
  className?: string;
}

export default function Button(props: IProps) {
  return (
    <button className={`px-4 py-2 ${props.className}`} onClick={() => props.onClick()}>
      {props.text}
    </button>
  )
}