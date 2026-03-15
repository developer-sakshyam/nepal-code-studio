import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/GlassCard";
import { blogPosts } from "@/data/blog";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-display font-bold text-3xl mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2);

  return (
    <Layout>
      <article className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <AnimatedSection>
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>
        </AnimatedSection>

        {/* Hero Image */}
        <AnimatedSection>
          <div className="relative rounded-2xl overflow-hidden mb-8">
            <img src={post.image} alt={post.title} className="w-full aspect-video object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        </AnimatedSection>

        {/* Meta */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
              {post.category}
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 text-xs rounded-lg bg-muted text-muted-foreground border border-border/50 flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </motion.span>
            ))}
          </div>
        </AnimatedSection>

        {/* Content */}
        <AnimatedSection delay={0.2}>
          <GlassCard className="prose-custom">
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              {post.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={i} className="font-display font-bold text-xl mt-8 mb-3 text-foreground">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <ul key={i} className="list-disc list-inside space-y-1 text-muted-foreground">
                      {paragraph.split('\n').map((item, j) => (
                        <li key={j}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="text-muted-foreground">{paragraph}</p>
                );
              })}
            </div>
          </GlassCard>
        </AnimatedSection>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <AnimatedSection>
              <h2 className="font-display font-bold text-2xl mb-6">Related Articles</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related, index) => (
                <AnimatedSection key={related.id} delay={index * 0.1}>
                  <Link to={`/blog/${related.id}`}>
                    <GlassCard className="group cursor-pointer">
                      <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{related.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(related.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        <span className="mx-1">·</span>
                        <Clock className="w-3 h-3" />
                        {related.readTime}
                      </div>
                    </GlassCard>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
};

export default BlogPost;
