import { useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'

export function AddUserForm({ onAdd }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [company, setCompany] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email) return

    const newUser = {
      id: Date.now(), // simple unique id for frontend-only
      name,
      email,
      phone,
      website,
      company: { name: company },
    }

    onAdd(newUser)

    // Reset form
    setName('')
    setEmail('')
    setPhone('')
    setWebsite('')
    setCompany('')
  }

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <div className="add-user-form__title">Add Mock User</div>

      <div className="add-user-form__fields">
        <div className="add-user-form__field">
          <label className="add-user-form__label">Name *</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="add-user-form__field">
          <label className="add-user-form__label">Email *</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="add-user-form__field">
          <label className="add-user-form__label">Phone</label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="add-user-form__field">
          <label className="add-user-form__label">Website</label>
          <Input value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <div className="add-user-form__field">
          <label className="add-user-form__label">Company</label>
          <Input value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
      </div>

      <div className="add-user-form__actions">
        <Button type="submit">Add User</Button>
      </div>
    </form>
  )
}
