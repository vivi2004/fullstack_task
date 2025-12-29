import { Button } from './Button'

export function StateMessage({ title, description, actionLabel, onAction }) {
  return (
    <div className="state">
      <div className="state__title">{title}</div>
      {description ? <div className="state__desc">{description}</div> : null}
      {actionLabel ? (
        <div className="state__actions">
          <Button variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
