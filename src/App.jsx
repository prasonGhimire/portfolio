import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
    ArrowUpRight, Sparkles, Mail, Phone, ShieldCheck, Activity, Cpu,
    GraduationCap, Code2, Layers, GitBranch, Zap, CheckCircle2, ChevronRight, ExternalLink, Download, Plus, Minus, Copy, Check
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                         EXECUTIVE PORTFOLIO DATA                           */
/* -------------------------------------------------------------------------- */
const profile = {
    name: 'Prason Ghimire',
    title: 'Assistant Vice President — AI Markets @ HSBC',
    tagline: 'Architecting High-Throughput Distributed AI & Financial Market Infrastructure',
    location: 'Bangalore, India',
    email: 'meet.prasonghimire@gmail.com',
    phone: '+91-9663050845',
    resumeUrl: '/Prason_Ghimire_CV.pdf',
    image: '/prason_pp.jpg',
    summary: 'Engineering Manager & Technical Principal with ~9 years of experience driving enterprise software delivery. Specialized in low-latency microservices, async agent pipelines, and secure GenAI implementations for mission-critical financial systems.',
};

// Social Profile Links extracted from https://prasonghimire.github.io/intro/
const socialLinks = [
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/prasonghimire/',
        svg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
        )
    },
    {
        name: 'GitHub',
        url: 'https://github.com/prasonghimire',
        svg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
            </svg>
        )
    },
    {
        name: 'Twitter / X',
        url: 'https://twitter.com/PrasonGhimire',
        svg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        )
    },
    {
        name: 'Medium',
        url: 'https://medium.com/@prason.ghimire',
        svg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
        )
    },
    {
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com/users/9651866/prason-ghimire',
        svg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731h10.68v-2.134H6.111v2.134zm.259-4.852l10.48 2.18.437-2.09-10.479-2.18-.438 2.09zm1.332-4.908l9.57 4.723.916-1.928-9.57-4.722-.916 1.927zm2.663-4.63l7.924 7.217 1.442-1.583-7.923-7.217-1.443 1.583zm4.567-3.923l5.503 9.176 1.832-1.097-5.503-9.176-1.832 1.097z" />
            </svg>
        )
    }
];

// Developer tools with official SVG vector paths for rendering onto 3D Canvas badges
const backgroundDevIcons = [
    { name: 'Python', color: '#3776AB', iconType: 'python' },
    { name: 'Apache Kafka', color: '#808080', iconType: 'kafka' },
    { name: 'Azure', color: '#0089D6', iconType: 'azure' },
    { name: 'Docker', color: '#2496ED', iconType: 'docker' },
    { name: 'Kubernetes', color: '#326CE5', iconType: 'k8s' },
    { name: 'Java', color: '#ED8B00', iconType: 'java' },
    { name: 'FastAPI', color: '#009688', iconType: 'fastapi' },
    { name: 'PostgreSQL', color: '#4169E1', iconType: 'postgres' },
    { name: 'React', color: '#61DAFB', iconType: 'react' },
    { name: 'Git', color: '#F05032', iconType: 'git' },
];

const impactMetrics = [
    {
        id: 'uptime',
        label: 'System Uptime',
        value: '99.9%+',
        sub: 'Production Cloud Infrastructure',
        icon: ShieldCheck,
        highlight: 'Reliability Metric',
        context: 'High-availability target maintained across mission-critical financial microservices.',
        details: [
            'Configured multi-region failover and active-active Azure Kubernetes Service deployments.',
            'Implemented automated zero-downtime rolling updates in continuous integration pipelines.',
            'Integrated real-time synthetic monitoring and health checks.'
        ]
    },
    {
        id: 'code-redundancy',
        label: 'Code Redundancy',
        value: '-40%',
        sub: 'Core AI & Agent Pipelines',
        icon: Zap,
        highlight: 'Architecture Refactoring',
        context: 'Eliminated redundant logic across enterprise Python workflows.',
        details: [
            'Refactored disparate LLM execution handlers into modular async LangGraph nodes.',
            'Established shared utility libraries and domain-specific middleware across backend services.',
            'Standardized schema validation using Pydantic models to reduce repetitive checks.'
        ]
    },
    {
        id: 'setup-velocity',
        label: 'Setup Velocity',
        value: '60% Faster',
        sub: 'Standardized Microservice Scaffolding',
        icon: Layers,
        highlight: 'Engineering Speed',
        context: 'Accelerated time-to-market for new microservice and API deployments.',
        details: [
            'Engineered reusable enterprise FastAPI & Spring Boot baseline boilerplate templates.',
            'Baked in centralized logging, OAuth2 security, and telemetry by default.',
            'Reduced initial developer setup time from weeks to standard automated provisioning days.'
        ]
    },
    {
        id: 'deployment-speed',
        label: 'Deployment Speed',
        value: '70% Cut',
        sub: 'Automated Container Delivery',
        icon: Activity,
        highlight: 'CI/CD Efficiency',
        context: 'Drastically reduced build, validation, and production push durations.',
        details: [
            'Migrated manual release processes to containerized Azure DevOps CI/CD pipelines.',
            'Optimized Docker multi-stage builds and container image caching strategies.',
            'Automated integration testing execution within pull-request checks.'
        ]
    }
];

const architectureWorkbench = [
    {
        id: 'arch-1',
        category: 'HSBC AI Markets Platform',
        title: 'Async Kafka Agent Mesh & Non-Blocking Guardrail Engine',
        tech: ['Apache Kafka', 'LangGraph', 'Python', 'FastAPI', 'LangFuse'],
        roi: 'Unbound Inference Bottlenecks',
        description: 'Designed and deployed an event-driven agent architecture for enterprise financial intelligence. Decoupled guardrail compliance and logging into asynchronous worker pools over Kafka.',
        outcomes: [
            'Eliminated sync execution blockages in live LLM pipelines',
            'Parallelized compliance, guardrails, and telemetry processing',
            'Integrated SQL and KDB vector retrieval engines'
        ]
    },
    {
        id: 'arch-2',
        category: 'Enterprise Microservices Platform',
        title: 'Standardized Backend Core & Azure CI/CD Pipeline',
        tech: ['Azure OpenAI', 'Docker', 'Kubernetes', 'Java', 'PL/SQL'],
        roi: '60% Faster Onboarding',
        description: 'Engineered reusable microservice foundations and continuous deployment workflows, powering over 20 production REST APIs across multi-team deployments.',
        outcomes: [
            'Architected fault-tolerant REST APIs handling enterprise traffic',
            'Engineered Azure DevOps and Docker workflows yielding 99.9%+ availability',
            'Optimized SQL queries delivering 60% faster database execution speed'
        ]
    }
];

const skillCategories = [
    {
        title: 'Generative AI & Agentic Workflows',
        icon: Cpu,
        skills: ['LangGraph', 'LangChain', 'LangFuse', 'RAG Pipelines', 'OpenAI Services', 'MCP Tools', 'Vector Search (KDB)', 'Prompt Engineering']
    },
    {
        title: 'Distributed Backend & Microservices',
        icon: Code2,
        skills: ['Python (FastAPI / Flask)', 'Java (Spring Boot)', 'Apache Kafka', 'Microservices', 'Azure Cloud', 'Docker & Kubernetes', 'SQL / Redis', 'Elasticsearch']
    },
    {
        title: 'Engineering Leadership & Strategy',
        icon: GitBranch,
        skills: ['System Design', 'Engineering Management', 'Technical Strategy', 'SAFe / Agile', 'CI/CD Pipelines', 'Data Governance', 'REST APIs', 'Code Optimization']
    }
];

const experience = [
    {
        period: 'SEP 2024 — PRESENT',
        company: 'HSBC',
        role: 'Assistant Vice President (AVP), AI Markets',
        location: 'Bangalore, India',
        highlights: [
            'Lead and architect enterprise-grade AI applications for financial markets using Python, FastAPI, Generative AI, MCP Tools, and LLMs.',
            'Redesigned LLM agent architecture using Apache Kafka-based asynchronous communication, boosting scalability, fault tolerance, and parallel execution.',
            'Developed a Generic AI Data Analyst Agent utilizing SQL and KDB retrieval with secure data governance via LangGraph and LangFuse.',
            'Refactored large enterprise Python codebases, cutting code redundancy by ~40%.'
        ]
    },
    {
        period: 'MAY 2020 — AUG 2024',
        company: 'Accenture',
        role: 'AI Engineering Associate Manager',
        location: 'Bangalore, India',
        highlights: [
            'Led cross-functional engineering teams delivering enterprise applications using Python, FastAPI, Flask, and Microservices Architecture.',
            'Established reusable backend frameworks reducing new project setup time by ~60% across organization teams.',
            'Designed and maintained 20+ production-grade REST APIs for analytics, automation, and document processing.',
            'Modernized deployment architecture via Azure DevOps and Docker, achieving 99.9%+ availability and cutting deployment time by ~70%.'
        ]
    },
    {
        period: 'JUN 2018 — APR 2020',
        company: 'Cotiviti Nepal',
        role: 'Software Engineer',
        location: 'Kathmandu, Nepal',
        highlights: [
            'Engineered automated ETL solutions for data profiling, validation, cleansing, and auditing workflows using Python and Java.',
            'Optimized backend SQL queries and PL/SQL packages, improving execution speeds by up to 60% for high-volume data.'
        ]
    }
];

const credentials = [
    { type: 'Master of Science', title: 'ML & Artificial Intelligence', sub: 'Liverpool John Moores University, UK' },
    { type: 'Bachelor of Science', title: 'Information Management', sub: 'Tribhuwan University, Kathmandu' },
    { type: 'Certification', title: 'AZ-900: Azure Fundamentals', sub: 'Microsoft Certified' },
    { type: 'Certification', title: 'AI-900: Azure AI Fundamentals', sub: 'Microsoft Certified' },
    { type: 'Certification', title: 'SAFe Agile Practitioner', sub: 'Scaled Agile Framework' },
    { type: 'Honor & Award', title: 'Tenacious Techno / Star Award', sub: 'Accenture AI Hub Leadership Award' }
];

/* -------------------------------------------------------------------------- */
/*      3D THREE.JS CANVAS: WAVE MESH + DEVICON BRAND BADGES (DEPTH CONTROLLED) */
/* -------------------------------------------------------------------------- */
function LiquidWaveWithDevIcons({ mousePos }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);

        camera.position.z = 24;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const geometry = new THREE.PlaneGeometry(50, 32, 64, 64);
        const material = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            wireframe: true,
            transparent: true,
            opacity: 0.1,
        });
        const waveMesh = new THREE.Mesh(geometry, material);
        waveMesh.position.z = -5;
        scene.add(waveMesh);

        const drawIconSymbol = (ctx, iconType, color, x, y, size) => {
            ctx.save();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;

            switch (iconType) {
                case 'python':
                    ctx.beginPath();
                    ctx.arc(x, y - 4, size / 2, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 'docker':
                    ctx.fillRect(x - size / 2, y - 2, size / 3, size / 3);
                    ctx.fillRect(x - size / 6, y - 2, size / 3, size / 3);
                    ctx.fillRect(x + size / 6, y - 2, size / 3, size / 3);
                    break;
                case 'react':
                    ctx.beginPath();
                    ctx.ellipse(x, y, size / 2, size / 4, Math.PI / 4, 0, 2 * Math.PI);
                    ctx.stroke();
                    break;
                case 'git':
                    ctx.beginPath();
                    ctx.arc(x - 4, y + 4, 3, 0, Math.PI * 2);
                    ctx.arc(x + 4, y - 4, 3, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(x - 4, y + 4);
                    ctx.lineTo(x + 4, y - 4);
                    ctx.stroke();
                    break;
                default:
                    ctx.beginPath();
                    ctx.arc(x, y, size / 2.5, 0, Math.PI * 2);
                    ctx.fill();
                    break;
            }
            ctx.restore();
        };

        const createToolBadgeTexture = (tool) => {
            const canvas = document.createElement('canvas');
            canvas.width = 300;
            canvas.height = 90;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = 'rgba(8, 14, 28, 0.82)';
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
            ctx.lineWidth = 2.5;

            const r = 24;
            ctx.beginPath();
            ctx.moveTo(r, 0);
            ctx.lineTo(300 - r, 0);
            ctx.quadraticCurveTo(300, 0, 300, r);
            ctx.lineTo(300, 90 - r);
            ctx.quadraticCurveTo(300, 90, 300 - r, 90);
            ctx.lineTo(r, 90);
            ctx.quadraticCurveTo(0, 90, 0, 90 - r);
            ctx.lineTo(0, r);
            ctx.quadraticCurveTo(0, 0, r, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            drawIconSymbol(ctx, tool.iconType, tool.color, 42, 45, 20);

            ctx.fillStyle = '#f8fafc';
            ctx.font = 'bold 24px sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(tool.name, 72, 45);

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        };

        const toolsGroup = new THREE.Group();
        toolsGroup.position.z = -8;
        scene.add(toolsGroup);

        const badgeMeshes = backgroundDevIcons.map((tool, idx) => {
            const texture = createToolBadgeTexture(tool);
            const spriteMat = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: 0.5
            });
            const sprite = new THREE.Sprite(spriteMat);

            const radius = 14 + (idx % 2) * 4;
            const angle = (idx / backgroundDevIcons.length) * Math.PI * 2;

            sprite.position.x = Math.cos(angle) * radius;
            sprite.position.y = (Math.random() - 0.5) * 14;
            sprite.position.z = Math.sin(angle) * radius - 4;

            sprite.scale.set(4.2, 1.3, 1);
            sprite.userData = { radius, angle, speed: 0.0015 + Math.random() * 0.001, yOffset: sprite.position.y };

            toolsGroup.add(sprite);
            return sprite;
        });

        let frameId;
        let clock = new THREE.Clock();

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        const onMouseDown = (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - previousMousePosition.x;
            toolsGroup.rotation.y += deltaX * 0.003;
            waveMesh.rotation.y += deltaX * 0.001;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        };

        const onMouseUp = () => { isDragging = false; };

        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        const animate = () => {
            const time = clock.getElapsedTime();
            const positionAttribute = geometry.attributes.position;

            for (let i = 0; i < positionAttribute.count; i++) {
                const u = positionAttribute.getX(i);
                const v = positionAttribute.getY(i);
                const z = Math.sin(u * 0.3 + time * 0.8) * Math.cos(v * 0.3 + time * 0.6) * 1.2;
                positionAttribute.setZ(i, z);
            }
            positionAttribute.needsUpdate = true;

            badgeMeshes.forEach((sprite) => {
                const u = sprite.userData;
                u.angle += u.speed;

                const currentX = Math.cos(u.angle) * u.radius;
                const currentZ = Math.sin(u.angle) * u.radius - 4;

                sprite.position.x = currentX;
                sprite.position.z = currentZ;
                sprite.position.y = u.yOffset + Math.sin(time + u.angle) * 0.4;

                const depthFactor = (currentZ + 20) / 30;
                sprite.material.opacity = Math.max(0.1, Math.min(0.55, depthFactor * 0.6));
            });

            if (!isDragging && mousePos) {
                const targetRotX = (mousePos.y / window.innerHeight - 0.5) * 0.1;
                const targetRotY = (mousePos.x / window.innerWidth - 0.5) * 0.1;
                waveMesh.rotation.x += (targetRotX - waveMesh.rotation.x) * 0.02;
                waveMesh.rotation.y += (targetRotY - waveMesh.rotation.y) * 0.02;
            }

            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} className="fixed inset-0 cursor-grab active:cursor-grabbing z-0 pointer-events-none" />;
}

/* -------------------------------------------------------------------------- */
/*                  APPLE SPATIAL GLASS CARD COMPONENT                        */
/* -------------------------------------------------------------------------- */
function AppleGlassCard3D({ children, className = '', onClick, disable3dTilt = false }) {
    const cardRef = useRef(null);
    const [mouseSpot, setMouseSpot] = useState({ x: -300, y: -300 });

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 350, damping: 25 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 350, damping: 25 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        if (!disable3dTilt) {
            x.set(mouseX / rect.width - 0.5);
            y.set(mouseY / rect.height - 0.5);
        }

        setMouseSpot({ x: mouseX, y: mouseY });
    };

    const handleMouseLeave = () => {
        if (!disable3dTilt) {
            x.set(0);
            y.set(0);
        }
        setMouseSpot({ x: -300, y: -300 });
    };

    return (
        <motion.div
            ref={cardRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={disable3dTilt ? {} : { scale: 1.015, transition: { duration: 0.2 } }}
            style={disable3dTilt ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-2xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-colors duration-500 hover:border-cyan-500/40 group ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(600px circle at ${mouseSpot.x}px ${mouseSpot.y}px, rgba(56, 189, 248, 0.12), transparent 80%)`,
                }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/15 via-transparent to-transparent opacity-30" />

            <div style={disable3dTilt ? {} : { transform: 'translateZ(20px)' }} className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

/* -------------------------------------------------------------------------- */
/*              EXPLICIT COLLAPSIBLE IMPACT METRIC CARD                      */
/* -------------------------------------------------------------------------- */
function ImpactMetricCard({ metric }) {
    const [isOpen, setIsOpen] = useState(false);
    const IconComp = metric.icon;

    return (
        <AppleGlassCard3D className="p-6 transition-all duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                        {metric.highlight}
                    </span>
                    <div className="mt-1 text-3xl font-extrabold text-white tracking-tight">
                        {metric.value}
                    </div>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle details"
                    className="flex items-center justify-center h-8 w-8 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition"
                >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </button>
            </div>

            <div className="mt-2 text-sm font-semibold text-slate-100">
                {metric.label}
            </div>
            <div className="mt-0.5 text-xs text-slate-400">
                {metric.sub}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                            <p className="text-xs text-cyan-200/90 font-medium leading-relaxed">
                                {metric.context}
                            </p>

                            <div className="space-y-2">
                                {metric.details.map((detail, idx) => (
                                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                                        <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                                        <span className="leading-normal">{detail}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                    {isOpen ? 'Click - to collapse' : 'Click + for context'}
                </span>
                <IconComp size={15} className="text-slate-500" />
            </div>
        </AppleGlassCard3D>
    );
}

/* -------------------------------------------------------------------------- */
/*                               MAIN APPLICATION                             */
/* -------------------------------------------------------------------------- */
export default function App() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [activeArchId, setActiveArchId] = useState('arch-1');

    // Toast notification state for copying email to clipboard
    const [toastMessage, setToastMessage] = useState(null);

    useEffect(() => {
        const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    /* Copy email to clipboard & open fallback options */
    const handleContactClick = (e) => {
        if (e) e.preventDefault();

        // 1. Copy email address to clipboard
        navigator.clipboard.writeText(profile.email);

        // 2. Display persistent notification toast
        setToastMessage(`Email (${profile.email}) copied to clipboard! Opening mail options...`);
        setTimeout(() => {
            setToastMessage(null);
        }, 6000);

        // 3. Attempt native mailto client trigger
        window.location.href = `mailto:${profile.email}`;

        // 4. Open webmail fallback (Gmail Compose URL) in a new tab for systems without local mail client
        setTimeout(() => {
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;
            window.open(gmailUrl, '_blank', 'noopener,noreferrer');
        }, 400);
    };

    return (
        <div className="relative min-h-screen bg-[#030712] text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">

            {/* Background Three.js Orbiting Canvas */}
            <LiquidWaveWithDevIcons mousePos={mousePos} />

            {/* Floating Notification Toast */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[90%]"
                    >
                        <div className="flex items-center space-x-3 rounded-2xl border border-cyan-400/40 bg-slate-950/90 backdrop-blur-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 shrink-0">
                                <Check size={18} />
                            </div>
                            <div className="text-xs text-slate-200">
                                <p className="font-semibold text-white">Email Address Copied!</p>
                                <p className="text-slate-400 mt-0.5">{profile.email} copied to clipboard. You can paste it into any webmail or messaging app.</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation Header */}
            <header className="sticky top-6 z-50 mx-auto max-w-4xl px-4">
                <nav className="flex items-center justify-between rounded-full border border-white/10 bg-slate-950/80 backdrop-blur-2xl px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <a href="#" className="flex items-center space-x-2.5 text-white hover:text-cyan-300 transition">
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-pulse" />
                        <span className="text-sm font-semibold tracking-tight">{profile.name}</span>
                    </a>

                    <div className="hidden sm:flex items-center space-x-8 text-xs font-medium text-slate-300">
                        <a href="#about" className="hover:text-white transition">Overview</a>
                        <a href="#workbench" className="hover:text-white transition">Architecture Workbench</a>
                        <a href="#skills" className="hover:text-white transition">Tech Stack</a>
                        <a href="#experience" className="hover:text-white transition">Experience</a>
                    </div>

                    <div className="flex items-center space-x-3">
                        <a
                            href={profile.resumeUrl}
                            download
                            className="flex items-center space-x-1.5 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
                        >
                            <Download size={13} />
                            <span className="hidden sm:inline">CV</span>
                        </a>

                        <button
                            onClick={handleContactClick}
                            className="flex items-center space-x-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-cyan-300 transition shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                        >
                            <span>Contact</span>
                            <ArrowUpRight size={13} />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Main Content Layout */}
            <main className="relative z-10 mx-auto max-w-4xl px-4 pt-16 pb-24 space-y-16">

                {/* HERO SECTION */}
                <section id="about" className="space-y-6">
                    <AppleGlassCard3D disable3dTilt={true} className="p-8 sm:p-12">
                        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">

                            {/* Profile Image Column */}
                            <div className="relative shrink-0">
                                <div className="relative h-40 w-40 sm:h-48 sm:w-48 rounded-3xl overflow-hidden border-2 border-cyan-400/40 p-1 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 shadow-[0_0_30px_rgba(56,189,248,0.25)]">
                                    <img
                                        src={profile.image}
                                        alt={profile.name}
                                        className="h-full w-full object-cover rounded-2xl filter contrast-105"
                                    />
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20 pointer-events-none" />
                                </div>

                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 rounded-full border border-cyan-400/40 bg-slate-950/90 px-3 py-1 text-[10px] font-semibold text-cyan-300 backdrop-blur-md shadow-lg whitespace-nowrap">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span>Available for Advisory</span>
                                </div>
                            </div>

                            {/* Profile Details Column */}
                            <div className="space-y-5 text-center md:text-left flex-1">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                                    <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs text-cyan-300 font-semibold backdrop-blur-md">
                                        <Sparkles size={13} className="text-cyan-400 animate-pulse" />
                                        <span>{profile.title}</span>
                                    </div>

                                    <div className="inline-flex items-center space-x-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                                        <GraduationCap size={13} className="text-cyan-400" />
                                        <span>M.Sc. ML & AI</span>
                                    </div>
                                </div>

                                <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                                    Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300">Distributed AI Workflows</span> & Core Infrastructure.
                                </h1>

                                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                    {profile.summary}
                                </p>

                                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                                    <a
                                        href={profile.resumeUrl}
                                        download
                                        className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-cyan-400 to-sky-300 px-6 py-2.5 text-xs font-bold text-slate-950 hover:brightness-110 transition shadow-[0_0_25px_rgba(56,189,248,0.4)]"
                                    >
                                        <Download size={14} />
                                        <span>Download Official CV</span>
                                    </a>

                                    <button
                                        onClick={handleContactClick}
                                        className="flex items-center space-x-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition"
                                    >
                                        <Mail size={14} />
                                        <span>Direct Contact</span>
                                    </button>

                                    <a
                                        href={`tel:${profile.phone}`}
                                        className="flex items-center space-x-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition"
                                    >
                                        <Phone size={14} />
                                        <span>{profile.phone}</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </AppleGlassCard3D>

                    {/* COLLAPSIBLE IMPACT METRICS */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                                Engineering Impact & Benchmarks
                            </h2>
                            <div className="h-px bg-slate-800/80 flex-1 ml-6" />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {impactMetrics.map((m) => (
                                <ImpactMetricCard key={m.id} metric={m} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ARCHITECTURE WORKBENCH */}
                <section id="workbench" className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Architecture Workbench (Click to Expand)</h2>
                        <div className="h-px bg-slate-800/80 flex-1 ml-6" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {architectureWorkbench.map((arch) => (
                            <AppleGlassCard3D
                                key={arch.id}
                                onClick={() => setActiveArchId(arch.id)}
                                className={`cursor-pointer transition-all ${activeArchId === arch.id ? 'border-cyan-400/60 bg-cyan-950/20' : 'hover:border-white/30'
                                    }`}
                            >
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-mono text-cyan-400 font-semibold">{arch.category}</span>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 font-semibold">
                                            {arch.roi}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-white tracking-tight flex items-center justify-between">
                                        <span>{arch.title}</span>
                                        <ChevronRight size={18} className={`text-cyan-400 transition-transform ${activeArchId === arch.id ? 'rotate-90' : ''}`} />
                                    </h3>

                                    <p className="text-xs text-slate-300 leading-relaxed">{arch.description}</p>

                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                        {arch.tech.map((t) => (
                                            <span key={t} className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[11px] text-slate-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {activeArchId === arch.id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            transition={{ duration: 0.3 }}
                                            className="pt-4 border-t border-white/10 space-y-2"
                                        >
                                            <div className="text-xs font-semibold text-white">System Outcomes:</div>
                                            {arch.outcomes.map((o, i) => (
                                                <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                                                    <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                                                    <span>{o}</span>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            </AppleGlassCard3D>
                        ))}
                    </div>
                </section>

                {/* CORE SKILLS */}
                <section id="skills" className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Core Production Competencies</h2>
                        <div className="h-px bg-slate-800/80 flex-1 ml-6" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {skillCategories.map((cat) => {
                            const IconComp = cat.icon;
                            return (
                                <AppleGlassCard3D key={cat.title} className="h-full p-6 space-y-4">
                                    <div className="flex items-center space-x-2 text-cyan-400">
                                        <IconComp size={18} />
                                        <h3 className="text-sm font-semibold text-white tracking-tight">{cat.title}</h3>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5">
                                        {cat.skills.map((s) => (
                                            <span
                                                key={s}
                                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 font-medium hover:border-cyan-400/50 hover:text-cyan-300 transition"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </AppleGlassCard3D>
                            );
                        })}
                    </div>
                </section>

                {/* CAREER HISTORY */}
                <section id="experience" className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Career History</h2>
                        <div className="h-px bg-slate-800/80 flex-1 ml-6" />
                    </div>

                    <AppleGlassCard3D className="p-8 sm:p-10">
                        <div className="space-y-10">
                            {experience.map((exp, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-white/10 last:border-none last:pb-0"
                                >
                                    <div className="md:w-1/3 space-y-2">
                                        <span className="inline-block px-2.5 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 font-mono text-[11px] text-cyan-300 font-semibold">
                                            {exp.period}
                                        </span>
                                        <h3 className="text-2xl font-bold text-white tracking-tight">{exp.company}</h3>
                                        <div className="text-xs font-bold text-slate-200">{exp.role}</div>
                                        <div className="text-xs text-slate-400">{exp.location}</div>
                                    </div>

                                    <div className="md:w-2/3 space-y-3">
                                        {exp.highlights.map((h, hIdx) => (
                                            <div key={hIdx} className="flex items-start space-x-3 text-sm text-slate-300 leading-relaxed">
                                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                                                <span>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AppleGlassCard3D>
                </section>

                {/* CREDENTIALS */}
                <section id="credentials" className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Credentials & Education</h2>
                        <div className="h-px bg-slate-800/80 flex-1 ml-6" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {credentials.map((item) => (
                            <AppleGlassCard3D key={item.title} className="p-6">
                                <div className="flex items-start space-x-3">
                                    <div className="p-2.5 rounded-full border border-white/10 bg-white/5 text-cyan-400 shrink-0 mt-0.5">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">{item.type}</div>
                                        <div className="text-sm font-bold text-white mt-0.5">{item.title}</div>
                                        <div className="text-xs text-slate-400 mt-0.5">{item.sub}</div>
                                    </div>
                                </div>
                            </AppleGlassCard3D>
                        ))}
                    </div>
                </section>

                {/* FOOTER WITH SOCIAL LINKS & BRANDING */}
                <footer className="pt-12 space-y-8">
                    <AppleGlassCard3D disable3dTilt={true} className="p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            {/* Left Side: Direct actions */}
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-slate-300">
                                <a
                                    href={profile.resumeUrl}
                                    download
                                    className="flex items-center space-x-1.5 hover:text-cyan-300 transition"
                                >
                                    <Download size={13} className="text-cyan-400" />
                                    <span>Download CV</span>
                                </a>
                                <span className="text-slate-700">•</span>
                                <button
                                    onClick={handleContactClick}
                                    className="flex items-center space-x-1.5 hover:text-cyan-300 transition"
                                >
                                    <Mail size={13} className="text-cyan-400" />
                                    <span>Contact {profile.name}</span>
                                    <ExternalLink size={11} className="text-slate-500" />
                                </button>
                            </div>

                            {/* Right Side: Social Icons with SVG Logos */}
                            <div className="flex items-center space-x-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={social.name}
                                        className="flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:scale-110 transition duration-300 shadow-sm"
                                    >
                                        {social.svg}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-slate-500">
                            © {new Date().getFullYear()} {profile.name}. Spatial Interactive Portfolio. All rights reserved.
                        </div>
                    </AppleGlassCard3D>
                </footer>

            </main>

        </div>
    );
}