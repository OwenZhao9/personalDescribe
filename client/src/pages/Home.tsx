import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  Brain, 
  Mic2, 
  Code2, 
  GraduationCap, 
  Trophy, 
  Users, 
  Sparkles,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Cpu,
  MessageSquare,
  Wand2,
  Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/* 
 * Design: 极简科技白
 * 突出：理工背景、AI能力、脱口秀经验
 * 配色：科技蓝(#0066FF) + 活力红(#FF4D4D)
 */

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return { count, ref };
}

// Fade in animation wrapper
function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Navigation component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "关于我", href: "#about" },
    { label: "AI能力", href: "#ai" },
    { label: "脱口秀", href: "#comedy" },
    { label: "理工背景", href: "#tech" },
    { label: "联系方式", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="font-sora font-bold text-xl gradient-text">
          赵宁
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors animated-underline"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

// Hero section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-transparent" />
      
      <div className="container relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI + 脱口秀培训师
            </div>
            
            <h1 className="font-sora text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              赵宁
              <span className="block text-3xl lg:text-4xl font-medium text-foreground/70 mt-2">
                用AI赋能喜剧创作
              </span>
            </h1>
            
            <p className="text-lg text-foreground/60 mb-8 max-w-lg leading-relaxed">
              211理工科背景，5年脱口秀经验，深耕AI+喜剧创作领域。
              帮助企业老板用AI工具提升表达能力，让每一次演讲都充满感染力。
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="font-medium">
                <Mail className="w-4 h-4 mr-2" />
                联系我
              </Button>
              <Button size="lg" variant="outline" className="font-medium">
                了解更多
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
          
          {/* Right - Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />
              
              {/* Photo container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/001.webp" 
                  alt="赵宁" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI研究者</p>
                    <p className="text-xs text-muted-foreground">ChatGPT · Cursor · Manus</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-6 -right-6 glass-card rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Mic2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">脱口秀演员</p>
                    <p className="text-xs text-muted-foreground">5年 · 3000+场</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-6 h-6 text-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Stats section
function StatsSection() {
  const stats = [
    { value: 3000, suffix: "+", label: "脱口秀演出场次", icon: Mic2 },
    { value: 70000, suffix: "+", label: "观众人次", icon: Users },
    { value: 40, suffix: "+", label: "科技奖项", icon: Trophy },
    { value: 20, suffix: "万", label: "众筹融资(美元)", icon: Sparkles },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const { count, ref } = useCounter(stat.value);
            const Icon = stat.icon;
            return (
              <FadeInSection key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-space text-4xl lg:text-5xl font-bold text-foreground mb-2">
                    <span ref={ref}>{count.toLocaleString()}</span>
                    <span className="text-primary">{stat.suffix}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// About section
function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container">
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="font-sora text-3xl lg:text-4xl font-bold mb-4">关于我</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              理工科出身的脱口秀演员，用技术思维解构喜剧，用AI工具赋能创作
            </p>
          </div>
        </FadeInSection>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeInSection delay={0.2}>
            <div className="relative">
              <img 
                src="/images/002.webp" 
                alt="赵宁个人照" 
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />
            </div>
          </FadeInSection>
          
          <FadeInSection delay={0.3}>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="glass-card rounded-xl p-4">
                  <p className="text-muted-foreground mb-1">学历</p>
                  <p className="font-medium">本科 211</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <p className="text-muted-foreground mb-1">院校</p>
                  <p className="font-medium">大连海事大学</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <p className="text-muted-foreground mb-1">专业</p>
                  <p className="font-medium">轮机工程</p>
                </div>
              </div>
              
              <p className="text-foreground/80 leading-relaxed">
                我是赵宁，一个有着独特背景的AI+脱口秀培训师。大学期间在大连海事大学学习轮机工程，
                获得全国大学生智能汽车竞赛全国二等奖，积累了40余项科技奖项。
              </p>
              <p className="text-foreground/80 leading-relaxed">
                毕业后曾在知乎、京东等互联网公司担任产品经理，2019年开始脱口秀生涯，
                至今已演出近3000场，服务观众超7万人次。现在，我将AI技术与脱口秀创作结合，
                帮助更多人用科技提升表达能力。
              </p>
              
              <div className="flex flex-wrap gap-3">
                {["CET-6", "全马完赛×3", "魔术", "滑雪", "摩托"].map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// AI Skills section
function AISection() {
  const aiSkills = [
    {
      icon: MessageSquare,
      title: "ChatGPT 文稿生成",
      description: "利用ChatGPT生成脱口秀文稿，通过精准的提示词工程，快速产出高质量的喜剧内容",
    },
    {
      icon: Wand2,
      title: "GPTs 定制调优",
      description: "创建专属的GPTs应用，针对脱口秀创作场景进行深度调优，提升内容的幽默度和感染力",
    },
    {
      icon: Code2,
      title: "Cursor 编程开发",
      description: "使用Cursor AI编程工具，快速开发帮助演员调整文稿的小程序，提升创作效率",
    },
    {
      icon: Bot,
      title: "Manus Agent",
      description: "运用Manus智能Agent，实现复杂任务的自动化处理，让AI成为创作的得力助手",
    },
  ];

  return (
    <section id="ai" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      <div 
        className="absolute top-0 right-0 w-1/2 h-full opacity-10"
        style={{ 
          backgroundImage: "url('/images/tech-pattern.png')",
          backgroundSize: "cover"
        }}
      />
      
      <div className="container relative z-10">
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              AI 能力
            </div>
            <h2 className="font-sora text-3xl lg:text-4xl font-bold mb-4">
              AI + 脱口秀的创新融合
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              将前沿AI技术应用于喜剧创作，开创全新的内容生产方式
            </p>
          </div>
        </FadeInSection>
        
        <div className="grid md:grid-cols-2 gap-6">
          {aiSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <FadeInSection key={skill.title} delay={index * 0.1}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-primary/10">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-sora font-semibold text-lg mb-2">{skill.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            );
          })}
        </div>
        
        {/* AI Training highlight */}
        <FadeInSection delay={0.4}>
          <div className="mt-12 glass-card rounded-2xl p-8 text-center">
            <h3 className="font-sora text-xl font-semibold mb-4">AI+脱口秀培训项目</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              专为企业老板设计的培训课程，教你如何利用AI工具快速生成演讲稿、
              调整表达节奏、提升舞台感染力。让每一次公开表达都能引发共鸣。
            </p>
            <Button size="lg">
              了解培训详情
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// Comedy section
function ComedySection() {
  const timeline = [
    {
      year: "2019",
      events: [
        "天猫户外创意广告编剧",
        "京东直播编剧",
        "CCTV黄金100秒决赛选手",
      ],
    },
    {
      year: "2020-2021",
      events: [
        "英特尔、快手特邀演出嘉宾",
        "脱口秀演出近3,000场",
        "观看人数近70,000人次",
        "庞麦郎词作者",
        "脱口秀讲师",
      ],
    },
    {
      year: "2022",
      events: [
        "中国外文局中外元宇宙对话活动表演嘉宾",
        "CCTV交通频道脱口秀比赛编剧",
        "腾讯视频马上脱口秀表演嘉宾",
        "Bilibili脱口秀直播表演嘉宾",
        "菲律宾国家旅游局潜水脱口秀表演嘉宾",
        "脱口秀演出全国巡演",
      ],
    },
  ];

  return (
    <section id="comedy" className="py-24 relative">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/comedy-stage.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
      
      <div className="container relative z-10">
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
              <Mic2 className="w-4 h-4" />
              脱口秀经历
            </div>
            <h2 className="font-sora text-3xl lg:text-4xl font-bold mb-4 text-white">
              5年舞台，3000+场演出
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              从CCTV到腾讯视频，从英特尔到菲律宾国家旅游局，用幽默连接世界
            </p>
          </div>
        </FadeInSection>
        
        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {timeline.map((item, index) => (
            <FadeInSection key={item.year} delay={index * 0.15}>
              <div className="relative pl-8 pb-12 last:pb-0">
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20" />
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-accent -translate-x-1/2" />
                
                <div className="mb-4">
                  <span className="font-space text-2xl font-bold text-accent">{item.year}</span>
                </div>
                <div className="space-y-2">
                  {item.events.map((event, i) => (
                    <p key={i} className="text-white/80 text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                      {event}
                    </p>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
        
        {/* Performance photos */}
        <FadeInSection delay={0.5}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <img 
                src="/images/003.webp" 
                alt="脱口秀演出" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <img 
              src="/images/004.webp" 
              alt="演出现场" 
              className="w-full h-48 object-cover rounded-xl"
            />
            <img 
              src="/images/004.webp" 
              alt="观众互动" 
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// Tech background section
function TechSection() {
  const achievements = [
    {
      icon: Trophy,
      title: "全国大学生智能汽车竞赛",
      subtitle: "东北赛区冠军 · 全国二等奖",
      description: "作为队长负责硬件设计，带领团队设计开发电磁信号自动寻路避障智能小车，在全国128所高校1600+支队伍中脱颖而出",
    },
    {
      icon: Sparkles,
      title: "鱼尾科技创业",
      subtitle: "联合创始人 · Indiegogo众筹20万美元",
      description: "大学期间创立鱼尾科技，设计开发便携式户外充气泵，在美国Indiegogo众筹平台成功融资约100万人民币",
    },
    {
      icon: GraduationCap,
      title: "海风IT计算机协会",
      subtitle: "社长 · 管理100+成员",
      description: "管理软件部、移动开发部、设计部、网络部、硬件部，组织科技比赛和作品展，展出3000+件科技作品",
    },
  ];

  return (
    <section id="tech" className="py-24 bg-secondary/30">
      <div className="container">
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Cpu className="w-4 h-4" />
              理工背景
            </div>
            <h2 className="font-sora text-3xl lg:text-4xl font-bold mb-4">
              40+科技奖项的理工男
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              211工科院校出身，用工程师思维解构问题，用产品经理视角优化体验
            </p>
          </div>
        </FadeInSection>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeInSection key={item.title} delay={index * 0.1}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-sora font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-primary text-sm font-medium mb-3">{item.subtitle}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeInSection>
            );
          })}
        </div>
        
        {/* Work experience */}
        <FadeInSection delay={0.4}>
          <div className="mt-16">
            <h3 className="font-sora text-xl font-semibold text-center mb-8">产品经理经历</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["知乎", "京东", "Games Vessel", "AlphaMob"].map((company) => (
                <div 
                  key={company}
                  className="px-6 py-3 rounded-full bg-white shadow-sm border border-border text-sm font-medium"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// Contact section
function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="container">
        <FadeInSection>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-sora text-3xl lg:text-4xl font-bold mb-4">联系我</h2>
            <p className="text-muted-foreground mb-12">
              如果您对AI+脱口秀培训感兴趣，欢迎与我联系
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="glass-card rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">电话</p>
                <p className="font-medium">185-2226-9769</p>
              </div>
              
              <div className="glass-card rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">邮箱</p>
                <p className="font-medium">zhaoningup@gmail.com</p>
              </div>
              
              <div className="glass-card rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">地点</p>
                <p className="font-medium">北京</p>
              </div>
            </div>
            
            <Button size="lg" className="font-medium">
              <Mail className="w-4 h-4 mr-2" />
              发送邮件
            </Button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 赵宁. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a 
              href="https://www.indiegogo.com/projects/max-pump-best-outdoor-tool-enjoy-your-leisure-time"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Indiegogo 众筹项目
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Home component
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <AISection />
      <ComedySection />
      <TechSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
