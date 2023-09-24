interface IProps {
  text: string;
  onClick: Function
}

export default function Button(props: IProps) {
  return (
    <button className="px-4 py-2" onClick={() => props.onClick()}>
      {props.text}
    </button>
  )
}