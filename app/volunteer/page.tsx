import { PageHero } from '@/components/PageHero'

const roles = [
  ['book', 'Education Mentor', 'Support learners through tutoring, homework help and mentoring.', 'On-site · Weekly'],
  ['laptop', 'Digital Trainer', 'Teach practical computer and internet skills.', 'On-site · Monthly'],
  ['camera', 'Content Creator', 'Document stories, programs and impact through media.', 'Remote · Flexible'],
  ['people', 'Outreach Coordinator', 'Support community outreach and field activities.', 'Field · Part-time'],
]

function RoleIcon({ icon }: { icon: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {icon === 'book' && <>
        <path d="M12 5.5C9 3.5 5 3.5 2 4.5v15c3-1 7-1 10 1 3-2 7-2 10-1v-15c-3-1-7-1-10 1Z" />
        <path d="M12 5.5v15" />
      </>}
      {icon === 'laptop' && <>
        <rect x="4" y="3" width="16" height="13" rx="1.5" />
        <path d="m4 16-2 4h20l-2-4M10 20h4" />
      </>}
      {icon === 'camera' && <>
        <path d="M8 6 9.5 3h5L16 6h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
        <circle cx="12" cy="13" r="4" />
      </>}
      {icon === 'people' && <>
        <circle cx="12" cy="7" r="3" />
        <path d="M6 21v-2a6 6 0 0 1 12 0v2M18 4a3 3 0 0 1 0 6M22 20v-2a5 5 0 0 0-3-4.58M6 4a3 3 0 0 0 0 6M2 20v-2a5 5 0 0 1 3-4.58" />
      </>}
    </svg>
  )
}

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="GET INVOLVED"
        title="Volunteer With Us"
        intro="Join a growing community of volunteers helping Konuko Foundation create practical opportunities for learners and communities."
      />
      <section className="section">
        <div className="container">
          <span className="eyebrow">● OPEN ROLES</span>
          <h2>How You Can Help</h2>
          <div className="grid two">
            {roles.map(([icon, title, description, schedule]) => (
              <article className="role-card" key={title}>
                <div className="role-icon"><RoleIcon icon={icon} /></div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span>{schedule}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section form-section">
        <div className="container narrow">
          <span className="eyebrow">● APPLY NOW</span>
          <h2>Volunteer Application</h2>
          <form className="form-grid">
            <label>First Name<input name="firstName" placeholder="First name" /></label>
            <label>Last Name<input name="lastName" placeholder="Last name" /></label>
            <label>Email Address<input name="email" type="email" placeholder="you@example.com" /></label>
            <label>Phone Number<input name="phone" placeholder="+254 7XX XXX XXX" /></label>
            <label>City / Location<input name="location" placeholder="Nairobi, Kenya" /></label>
            <label>
              Role of Interest
              <select name="role">
                {roles.map(([, title]) => <option key={title}>{title}</option>)}
              </select>
            </label>
            <label className="full">
              Why do you want to volunteer?
              <textarea name="motivation" rows={5} placeholder="Tell us about your motivation..." />
            </label>
            <button className="btn btn-primary full" type="button">Submit Application</button>
          </form>
          <p className="form-note">Demo form for now. We can connect submissions later.</p>
        </div>
      </section>
    </>
  )
}
