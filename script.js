let posts = [];
let internships = [];
let students = [];
let currentView = 'feed';
let currentUser = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    university: 'State University',
    major: 'Computer Science',
    skills: ['JavaScript', 'Python', 'React', 'Data Analysis']
};

const samplePosts = [
    {
        id: 1,
        author: 'Michael Chen',
        title: 'HR Manager at TechCorp',
        time: '2 hours ago',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        content: 'TechCorp is looking for 3 Computer Science interns for our Summer 2024 program! You\'ll work on real projects with mentorship from senior engineers. Apply now!',
        image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        likes: 124,
        comments: 48,
        shares: 22
    },
    {
        id: 2,
        author: 'DataSystems Inc.',
        title: 'Official Page',
        time: '5 hours ago',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        content: 'Our Data Analyst Internship program is now accepting applications! Gain hands-on experience with big data tools and work with our analytics team on real client projects. Perfect for statistics, CS, or business analytics majors.',
        likes: 89,
        comments: 32,
        shares: 15
    }
];

const sampleInternships = [
    {
        id: 1,
        company: 'Google',
        position: 'Software Engineering Intern',
        location: 'Mountain View, CA',
        type: 'On-site',
        field: 'tech',
        deadline: 'May 15, 2024',
        description: 'Join Google\'s engineering team for a summer internship experience.',
        logo: 'https://logo.clearbit.com/google.com',
        requirements: ['Computer Science major', '3.0+ GPA', 'Programming experience'],
        duration: '12 weeks'
    },
    {
        id: 2,
        company: 'Meta',
        position: 'Product Design Intern',
        location: 'Remote',
        type: 'Remote',
        field: 'design',
        deadline: 'May 20, 2024',
        description: 'Work with Meta\'s design team on user experience projects.',
        logo: 'https://logo.clearbit.com/facebook.com',
        requirements: ['Design portfolio', 'Figma experience', 'UX/UI knowledge'],
        duration: '10 weeks'
    },
    {
        id: 3,
        company: 'Microsoft',
        position: 'Data Science Intern',
        location: 'Seattle, WA',
        type: 'Hybrid',
        field: 'tech',
        deadline: 'May 30, 2024',
        description: 'Analyze data and build ML models with Microsoft\'s data science team.',
        logo: 'https://logo.clearbit.com/microsoft.com',
        requirements: ['Statistics or CS major', 'Python/R experience', 'Machine Learning knowledge'],
        duration: '12 weeks'
    }
];

const sampleStudents = [
    {
        id: 1,
        name: 'Alex Rodriguez',
        university: 'MIT',
        major: 'Computer Science',
        year: 'Junior',
        avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
        skills: ['Java', 'C++', 'Algorithms'],
        lookingFor: 'Software Engineering Internship'
    },
    {
        id: 2,
        name: 'Emma Thompson',
        university: 'Stanford',
        major: 'Data Science',
        year: 'Sophomore',
        avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
        skills: ['Python', 'R', 'Machine Learning'],
        lookingFor: 'Data Analysis Internship'
    },
    {
        id: 3,
        name: 'David Kim',
        university: 'Berkeley',
        major: 'Business',
        year: 'Senior',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        skills: ['Marketing', 'Analytics', 'Strategy'],
        lookingFor: 'Marketing Internship'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    posts = [...samplePosts];
    internships = [...sampleInternships];
    students = [...sampleStudents];

    if (document.getElementById('loginForm')) {
        initializeLoginForm();
        return;
    }

    if (document.getElementById('signupForm')) {
        initializeSignupForm();
        return;
    }

    initializeEventListeners();
    showFeed(); 
});

function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email')?.value;
            const password = document.getElementById('password')?.value;

            if (email && password) {
                console.log('Login attempt:', { email, password });
                window.location.href = 'home.html';
            } else {
                alert('Please fill in all fields');
            }
        });
    }
}

function initializeSignupForm() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email')?.value;
            const password = document.getElementById('password')?.value;

            if (email && password) {
                console.log('Signup attempt:', { email, password });
                alert('Account created successfully! Please log in.');
                window.location.href = 'login.html';
            } else {
                alert('Please fill in all fields');
            }
        });
    }
}

function initializeEventListeners() {
    const navLinks = document.querySelectorAll('.navbar-center ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const icon = this.querySelector('i');
            if (icon?.classList.contains('fa-home')) {
                showFeed();
            } else if (icon?.classList.contains('fa-briefcase')) {
                showInternships();
            } else if (icon?.classList.contains('fa-network-wired')) {
                showStudents();
            } else if (icon?.classList.contains('fa-bell')) {
                showNotifications();
            }
        });
    });

    const profileImg = document.querySelector('.nav-profile-img');
    if (profileImg) {
        profileImg.addEventListener('click', function(e) {
            e.stopPropagation(); 
            toggleMenu();
        });
    }

    const profileMenu = document.getElementById('profileMenu');
    if (profileMenu) {
        profileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    document.addEventListener('click', function(event) {
        const profileMenu = document.getElementById('profileMenu');
        if (profileMenu) {
            profileMenu.style.display = 'none';
        }
    });

    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }

    const postBtn = document.querySelector('.post-btn');
    if (postBtn) {
        postBtn.addEventListener('click', function() {
            const textarea = document.querySelector('.create-post textarea');
            if (textarea && textarea.value.trim()) {
                createNewPost(textarea.value);
                textarea.value = '';
            }
        });
    }

    document.addEventListener('click', function(event) {
        const profileMenu = document.getElementById('profileMenu');
        const profileImg = document.querySelector('.nav-profile-img');
        
        if (profileMenu && !profileMenu.contains(event.target) && event.target !== profileImg) {
            profileMenu.style.display = 'none';
        }
    });

    const logoutLink = document.querySelector('.profile-menu-link i.fa-sign-out-alt')?.parentElement;
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
}

function toggleMenu() {
    const menu = document.getElementById('profileMenu');
    if (menu) {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
}

function showFeed() {
    currentView = 'feed';
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    const feedHTML = `
        <div class="create-post">
            <div class="create-post-input">
                <img src="${currentUser.avatar}" alt="${currentUser.name}">
                <textarea rows="2" placeholder="Share an internship opportunity, ask a question, or post an update"></textarea>
            </div>
            <div class="create-post-links">
                <li><i class="fas fa-image"></i> Photo</li>
                <li><i class="fas fa-video"></i> Video</li>
                <li><i class="fas fa-calendar-alt"></i> Event</li>
                <li><i class="fas fa-newspaper"></i> Write Article</li>
            </div>
            <button class="post-btn" onclick="publishPost()">Post</button>
        </div>

        <div class="sort-by">
            <hr>
            <p>Sort by: <span>top <i class="fas fa-chevron-down"></i></span></p>
        </div>

        ${getFeedPostsHTML()}
    `;
    
    mainContent.innerHTML = feedHTML;
    console.log('Switched to feed view');
}

function showInternships() {
    currentView = 'internships';
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    const internshipsHTML = `
        <div class="create-post">
            <h2 style="color: #0a66c2; margin-bottom: 20px;">🎯 Available Internships</h2>
            <div style="display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap;">
                <select onchange="filterInternships(this.value)" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="all">All Fields</option>
                    <option value="tech">Technology</option>
                    <option value="marketing">Marketing</option>
                    <option value="finance">Finance</option>
                    <option value="design">Design</option>
                </select>
                <select onchange="filterLocation(this.value)" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="all">All Locations</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">On-site</option>
                    <option value="hybrid">Hybrid</option>
                </select>
                <button class="post-btn" onclick="openPostInternshipModal()">Post New Internship</button>
            </div>
        </div>
        ${getInternshipListingsHTML()}
    `;
    
    mainContent.innerHTML = internshipsHTML;
    console.log('Switched to internships view');
}

function showStudents() {
    currentView = 'students';
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    const studentsHTML = `
        <div class="create-post">
            <h2 style="color: #0a66c2; margin-bottom: 20px;">👥 Student Network</h2>
            <p style="margin-bottom: 15px;">Connect with fellow students and build your professional network!</p>
            <div style="display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap;">
                <select onchange="filterStudents(this.value)" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="all">All Majors</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="business">Business</option>
                    <option value="engineering">Engineering</option>
                    <option value="data-science">Data Science</option>
                </select>
                <select onchange="filterYear(this.value)" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="all">All Years</option>
                    <option value="freshman">Freshman</option>
                    <option value="sophomore">Sophomore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                </select>
            </div>
        </div>
        ${getStudentListHTML()}
    `;
    
    mainContent.innerHTML = studentsHTML;
    console.log('Switched to students view');
}

function showNotifications() {
    currentView = 'notifications';
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    const notificationsHTML = `
        <div class="create-post">
            <h2 style="color: #0a66c2; margin-bottom: 20px;">🔔 Notifications</h2>
        </div>
        ${getNotificationsHTML()}
    `;
    
    mainContent.innerHTML = notificationsHTML;
    console.log('Switched to notifications view');
}

function getFeedPostsHTML() {
    return posts.map(post => `
        <div class="post">
            <div class="post-author">
                <img src="${post.avatar}" alt="${post.author}">
                <div>
                    <h1>${post.author}</h1>
                    <small>${post.title}</small>
                    <small>${post.time}</small>
                </div>
                ${
                    post.author === currentUser.name
                        ? `<button class="delete-post-btn" onclick="deletePost(${post.id})" style="margin-left:auto; background:#ff4d4f; color:white; border:none; border-radius:4px; padding:4px 10px; cursor:pointer;">Delete Post</button>`
                        : ''
                }
            </div>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" width="100%" class="post-img" alt="Post image">` : ''}
            
            <div class="post-stats">
                <div>
                    <i class="fas fa-thumbs-up"></i>
                    <span>${post.likes}</span>
                </div>
                <div>
                    <span>${post.comments} comments</span>
                    <span>${post.shares} shares</span>
                </div>
            </div>

            <div class="post-activity">
                <div onclick="likePost(${post.id})">
                    <i class="far fa-thumbs-up"></i>
                    <span>Like</span>
                </div>
                <div onclick="commentPost(${post.id})">
                    <i class="far fa-comment"></i>
                    <span>Comment</span>
                </div>
                <div onclick="sharePost(${post.id})">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </div>
                <div onclick="sendPost(${post.id})">
                    <i class="far fa-paper-plane"></i>
                    <span>Send</span>
                </div>
            </div>
        </div>
    `).join('');
}

function getInternshipListingsHTML() {
    return internships.map(internship => `
        <div class="post">
            <div class="post-author">
                <img src="${internship.logo}" style="width: 50px; height: 50px; object-fit: contain; background: white; padding: 5px; border-radius: 8px;" alt="${internship.company} logo">
                <div>
                    <h1>${internship.company}</h1>
                    <small>${internship.position}</small>
                    <small>${internship.location} • ${internship.type}</small>
                </div>
            </div>
            <p>${internship.description}</p>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span><strong>Duration:</strong> ${internship.duration}</span>
                    <span><strong>Deadline:</strong> ${internship.deadline}</span>
                </div>
                <div>
                    <strong>Requirements:</strong>
                    <ul style="margin: 5px 0 0 20px;">
                        ${internship.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="post-activity">
                <div onclick="applyInternship(${internship.id})" style="background: #0a66c2; color: white; border-radius: 20px; padding: 8px 16px; cursor: pointer;">
                    <i class="fas fa-paper-plane"></i>
                    <span>Apply Now</span>
                </div>
                <div onclick="saveInternship(${internship.id})">
                    <i class="far fa-bookmark"></i>
                    <span>Save</span>
                </div>
                <div onclick="shareInternship(${internship.id})">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </div>
            </div>
        </div>
    `).join('');
}

function getStudentListHTML() {
    return students.map(student => `
        <div class="post">
            <div class="post-author">
                <img src="${student.avatar}" alt="${student.name}">
                <div>
                    <h1>${student.name}</h1>
                    <small>${student.major} • ${student.year}</small>
                    <small>${student.university}</small>
                </div>
            </div>
            <p><strong>Looking for:</strong> ${student.lookingFor}</p>
            
            <div style="margin: 10px 0;">
                <strong>Skills:</strong>
                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px;">
                    ${student.skills.map(skill => `
                        <span style="background: #e2f0fe; color: #0a66c2; padding: 4px 8px; border-radius: 12px; font-size: 12px;">
                            ${skill}
                        </span>
                    `).join('')}
                </div>
            </div>

            <div class="post-activity">
                <div onclick="connectStudent(${student.id})" style="background: #0a66c2; color: white; border-radius: 20px; padding: 8px 16px; cursor: pointer;">
                    <i class="fas fa-user-plus"></i>
                    <span>Connect</span>
                </div>
                <div onclick="messageStudent(${student.id})">
                    <i class="far fa-envelope"></i>
                    <span>Message</span>
                </div>
                <div onclick="viewProfile(${student.id})">
                    <i class="fas fa-user"></i>
                    <span>View Profile</span>
                </div>
            </div>
        </div>
    `).join('');
}

function getNotificationsHTML() {
    const notifications = [
        { type: 'application', message: 'Your application to Google has been reviewed', time: '2 hours ago' },
        { type: 'connection', message: 'Alex Rodriguez wants to connect with you', time: '5 hours ago' },
        { type: 'internship', message: 'New internship posted by Microsoft', time: '1 day ago' },
        { type: 'message', message: 'You have a new message from Emma Thompson', time: '2 days ago' }
    ];

    return notifications.map(notification => `
        <div class="post">
            <div class="post-author">
                <i class="fas fa-bell" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: #e2f0fe; border-radius: 50%; color: #0a66c2;"></i>
                <div>
                    <h1>Notification</h1>
                    <small>${notification.time}</small>
                </div>
            </div>
            <p>${notification.message}</p>
        </div>
    `).join('');
}

function publishPost() {
    const textarea = document.querySelector('.create-post textarea');
    if (textarea && textarea.value.trim()) {
        createNewPost(textarea.value);
        textarea.value = '';
    }
}

function createNewPost(content) {
    const newPost = {
        id: posts.length + 1,
        author: currentUser.name,
        title: `${currentUser.major} Student at ${currentUser.university}`,
        time: 'Just now',
        avatar: currentUser.avatar,
        content: content,
        likes: 0,
        comments: 0,
        shares: 0
    };
    
    posts.unshift(newPost);
    if (currentView === 'feed') {
        showFeed();
    }
    console.log('New post created:', newPost);
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        if (currentView === 'feed') {
            showFeed();
        }
    }
}

function commentPost(postId) {
    const comment = prompt('Enter your comment:');
    if (comment && comment.trim()) {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.comments++;
            if (currentView === 'feed') {
                showFeed();
            }
        }
        console.log(`Comment on post ${postId}: ${comment}`);
    }
}

function sharePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.shares++;
        if (currentView === 'feed') {
            showFeed();
        }
        alert('Post shared successfully!');
    }
}

function sendPost(postId) {
    alert('Send functionality would open a message composer');
}

function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        posts = posts.filter(post => post.id !== postId);
        if (currentView === 'feed') {
            showFeed();
        }
        console.log('Post deleted:', postId);
    }
}

function applyInternship(internshipId) {
    const internship = internships.find(i => i.id === internshipId);
    if (internship) {
        alert(`Application submitted for ${internship.position} at ${internship.company}!`);
    }
}

function saveInternship(internshipId) {
    alert('Internship saved to your bookmarks!');
}

function shareInternship(internshipId) {
    alert('Internship shared successfully!');
}

function connectStudent(studentId) {
    const student = students.find(s => s.id === studentId);
    if (student) {
        alert(`Connection request sent to ${student.name}!`);
    }
}

function messageStudent(studentId) {
    const student = students.find(s => s.id === studentId);
    if (student) {
        alert(`Opening message composer for ${student.name}`);
    }
}

function viewProfile(studentId) {
    const student = students.find(s => s.id === studentId);
    if (student) {
        alert(`Viewing ${student.name}'s profile`);
    }
}

function filterInternships(field) {
    console.log(`Filtering internships by field: ${field}`);
}

function filterLocation(location) {
    console.log(`Filtering internships by location: ${location}`);
}

function filterStudents(major) {
    console.log(`Filtering students by major: ${major}`);
}

function filterYear(year) {
    console.log(`Filtering students by year: ${year}`);
}

function performSearch(query) {
    if (!query || !query.trim()) return;
    
    console.log(`Searching for: ${query}`);
    alert(`Search functionality would search for: "${query}"`);
}

function openPostInternshipModal() {
    alert('Post internship modal would open here');
}

function closePostModal() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function logout() {
    alert('You have been logged out.');
    window.location.href = 'index.html';
}

function addPhoto() {
    alert('Photo upload functionality would be implemented here');
}

function addDocument() {
    alert('Document upload functionality would be implemented here');
}

function addPoll() {
    alert('Poll creation functionality would be implemented here');
}
