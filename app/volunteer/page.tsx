import { PageHero } from '@/components/PageHero'

const roles = [
  ['🧑‍🏫', 'Education Mentor', 'Support learners through tutoring, homework help and mentoring.', 'On-site · Weekly'],
  ['💻', 'Digital Trainer', 'Teach practical computer and internet skills.', 'On-site · Monthly'],
  ['📸', 'Content Creator', 'Document stories, programs and impact through media.', 'Remote · Flexible'],
  ['🌍', 'Outreach Coordinator', 'Support community outreach and field activities.', 'Field · Part-time'],
]

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
                <div className="role-icon">{icon}</div>
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
