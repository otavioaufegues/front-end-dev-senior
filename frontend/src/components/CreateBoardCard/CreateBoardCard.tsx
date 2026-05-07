import './CreateBoardCard.css'

type Props = { onClick?: () => void }

export function CreateBoardCard({ onClick }: Props) {
  return (
    <button type="button" className="cbc" onClick={onClick}>
      <span className="cbcPlus">+</span>
      <span className="cbcText">Create New Board</span>
    </button>
  )
}