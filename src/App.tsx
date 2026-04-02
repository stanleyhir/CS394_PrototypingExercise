import React, { useState, useMemo } from 'react';
import './App.css'; // Assuming you have standard CSS here

// --- MOCK DATA ---
type Review = string;

interface CourseStats {
  overall: number; // out of 6
  teaching: number; // out of 6
  hours: string;
  learned: number; // out of 6
  challenging: number; // out of 6
}

interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  instructor: string;
  term: string;
  stats: CourseStats;
  reviews: Review[];
}

const mockCourses: Course[] = [
  {
    id: '1',
    code: 'COMP_ENG 346',
    name: 'Microcontrollers',
    department: 'COMP_ENG',
    instructor: 'Stephen Xia',
    term: 'Spring 2025',
    stats: { overall: 4.2, teaching: 4.5, hours: '8-11', learned: 4.8, challenging: 4.9 },
    reviews: [
      "Professor Xia is very knowledgeable, but the labs are extremely time-consuming. Start early!",
      "Great introduction to embedded systems. The final project was fun but required a lot of debugging.",
      "Lectures can be a bit dry, but the hands-on experience with the microcontrollers is invaluable."
    ]
  },
  {
    id: '2',
    code: 'COMP_ENG 205',
    name: 'Computer Systems',
    department: 'COMP_ENG',
    instructor: 'Joseph Russel',
    term: 'Fall 2025',
    stats: { overall: 3.9, teaching: 3.7, hours: '12-15', learned: 5.2, challenging: 5.5 },
    reviews: [
      "Brutal workload. You will learn a ton, but be prepared to spend all your weekends in the lab.",
      "Professor Russel is helpful in office hours, but the exams test very obscure edge cases.",
      "This class is a necessary evil. I understand systems much better now, but the 64% pass cutoff was stressful."
    ]
  },
  {
    id: '3',
    code: 'COMP_SCI 339',
    name: 'Databases',
    department: 'COMP_SCI',
    instructor: 'Jennie Rogers',
    term: 'Winter 2025',
    stats: { overall: 4.6, teaching: 4.8, hours: '4-7', learned: 4.5, challenging: 4.1 },
    reviews: [
      "Professor Rogers is amazing! Highly recommend taking this class with her. Very well structured.",
      "The homework assignments were straightforward and really helped solidify the SQL concepts.",
      "Fair exams and an engaging lecturer. One of the better CS electives."
    ]
  },
  {
    id: '4',
    code: 'ECON 202',
    name: 'Microeconomics',
    department: 'ECON',
    instructor: 'Mark Witte',
    term: 'Spring 2025',
    stats: { overall: 4.5, teaching: 4.9, hours: '4-7', learned: 4.4, challenging: 4.0 },
    reviews: [
      "Witte is an absolute legend. His lectures are hilarious and keep you engaged.",
      "The material isn't too difficult if you do the practice problems. Exams are very fair.",
      "Great introductory course. You actually learn how to apply micro principles to the real world."
    ]
  },
  {
    id: '5',
    code: 'ECON 201',
    name: 'Macroeconomics',
    department: 'ECON',
    instructor: 'Jonas Jin',
    term: 'Fall 2024',
    stats: { overall: 4.1, teaching: 4.0, hours: '3 or fewer', learned: 4.0, challenging: 3.5 },
    reviews: [
      "Pretty straightforward class. Jin explains the models well, but it can get a bit repetitive.",
      "Easy grading curve compared to other Econ classes. Just read the textbook and you'll be fine.",
      "A lot of graphing. Sometimes the lectures felt a bit slow, but overall a solid course."
    ]
  }
];

// --- COMPONENTS ---

const CourseCard = ({ course }: { course: Course }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '16px', cursor: 'pointer', backgroundColor: '#fff' }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ margin: '0 0 4px 0', color: '#4E2A84' }}>{course.code}: {course.name}</h3>
          <p style={{ margin: '0 0 12px 0', color: '#555' }}>Instructor: {course.instructor} | Term: {course.term}</p>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Overall</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: course.stats.overall >= 4.0 ? '#2E7D32' : '#d32f2f' }}>
              {course.stats.overall.toFixed(1)}/6
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Hours/Week</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0277bd' }}>
              {course.stats.hours}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Teaching</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: course.stats.teaching >= 4.0 ? '#2E7D32' : '#d32f2f' }}>
              {course.stats.teaching.toFixed(1)}/6
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div style={{ marginTop: '16px', borderTop: '1px solid #eee', paddingTop: '16px' }}>
          <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
             <div><strong>Amount Learned:</strong> {course.stats.learned.toFixed(1)}/6</div>
             <div><strong>Intellectual Challenge:</strong> {course.stats.challenging.toFixed(1)}/6</div>
          </div>
          
          <h4 style={{ margin: '0 0 8px 0' }}>Recent Reviews</h4>
          <ul style={{ paddingLeft: '20px', margin: 0, color: '#444' }}>
            {course.reviews.map((review, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>"{review}"</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [instructorFilter, setInstructorFilter] = useState('');
  const [termFilter, setTermFilter] = useState('');

  // Get unique values for dropdowns
  const departments = Array.from(new Set(mockCourses.map(c => c.department))).sort();
  const instructors = Array.from(new Set(mockCourses.map(c => c.instructor))).sort();
  const terms = Array.from(new Set(mockCourses.map(c => c.term))).sort();

  // Filter and Sort logic
  const filteredAndSortedCourses = useMemo(() => {
    let result = mockCourses;

    // Filter by Search Query (Name or Code)
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        c => c.name.toLowerCase().includes(lowerQuery) || c.code.toLowerCase().includes(lowerQuery)
      );
    }

    // Filter by Department
    if (departmentFilter) {
      result = result.filter(c => c.department === departmentFilter);
    }

    // Filter by Instructor
    if (instructorFilter) {
      result = result.filter(c => c.instructor === instructorFilter);
    }

    // Filter by Term
    if (termFilter) {
      result = result.filter(c => c.term === termFilter);
    }

    // Sort alphabetically by course code
    return result.sort((a, b) => a.code.localeCompare(b.code));
  }, [searchQuery, departmentFilter, instructorFilter, termFilter]);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ borderBottom: '2px solid #FDC82F', paddingBottom: '16px', marginBottom: '24px' }}>
        <h1 style={{ color: '#FDC82F', margin: 0, fontSize: '2.5rem' }}>CTEC Searcher</h1>
        <p style={{ color: '#666', margin: '8px 0 0 0' }}>Find the right classes without the dread of the archaic system.</p>
      </header>

      <div style={{ display: 'flex', gap: '32px' }}>
        {/* SIDEBAR FILTERS */}
        <div style={{ width: '300px', flexShrink: 0 }}>
          <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0 }}>Search & Filter</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', fontSize: '0.9rem' }}>Search Course Name/Code</label>
              <input 
                type="text" 
                placeholder="e.g. Microeconomics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', fontSize: '0.9rem' }}>Department</label>
              <select 
                value={departmentFilter} 
                onChange={(e) => setDepartmentFilter(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="">All Departments</option>
                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', fontSize: '0.9rem' }}>Instructor</label>
              <select 
                value={instructorFilter} 
                onChange={(e) => setInstructorFilter(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="">All Instructors</option>
                {instructors.map(inst => <option key={inst} value={inst}>{inst}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', fontSize: '0.9rem' }}>Term</label>
              <select 
                value={termFilter} 
                onChange={(e) => setTermFilter(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="">All Terms</option>
                {terms.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            
            <button 
              onClick={() => {
                setSearchQuery('');
                setDepartmentFilter('');
                setInstructorFilter('');
                setTermFilter('');
              }}
              style={{ width: '100%', padding: '8px', backgroundColor: '#e0e0e0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* RESULTS AREA */}
        <div style={{ flexGrow: 1 }}>
          <h2 style={{ marginTop: 0 }}>
            Search Results ({filteredAndSortedCourses.length} of {mockCourses.length})
          </h2>
          
          {filteredAndSortedCourses.length === 0 ? (
            <p style={{ color: '#666' }}>No courses match your criteria. Try adjusting your filters.</p>
          ) : (
            filteredAndSortedCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}