interface AuthorCardProps {
  name: string;
  role: string;
  bio: React.ReactNode;
  imageUrl?: string;
}

export default function AuthorCard({
  name,
  role,
  bio,
  imageUrl,
}: AuthorCardProps) {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold mb-6">About the Author</h2>
      <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-lg border bg-card">
        <div className="flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-24 h-24 rounded-full object-cover border-2 border-border"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-3xl text-muted-foreground border-2 border-border">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-medium">{name}</h3>
          <p className="text-sm text-primary mb-3">{role}</p>
          <p className="text-muted-foreground">{bio}</p>
        </div>
      </div>
    </section>
  );
}

