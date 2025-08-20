export interface MiscSection {
  title: string;
  description: string;
  items?: string[];
}

export interface MiscData {
  pageTitle: string;
  pageDescription: string;
  sections: MiscSection[];
}

export const miscData: MiscData = {
  pageTitle: "Miscellaneous",
  pageDescription: "A collection of various thoughts, resources, and interesting things I've come across.",
  sections: [
    {
      title: "Interesting Papers",
      description: "A curated list of research papers that caught my attention.",
      items: [
        "Paper 1: [Title of interesting paper]",
        "Paper 2: [Another interesting paper]",
        "Paper 3: [Yet another paper]"
      ]
    },
    {
      title: "Tools & Resources",
      description: "Useful tools and resources I've found helpful in my work.",
      items: [
        "Tool 1: [Description of useful tool]",
        "Tool 2: [Another useful resource]",
        "Tool 3: [Yet another tool]"
      ]
    },
    {
      title: "Random Thoughts",
      description: "Various ideas and thoughts that don't fit elsewhere.",
      items: [
        "Thought 1: [Interesting idea or observation]",
        "Thought 2: [Another random thought]",
        "Thought 3: [Yet another thought]"
      ]
    },
    {
      title: "Music",
      description: "Some tunes I enjoy listening to while working.",
      items: [
        "🎵 <a href='https://open.spotify.com/playlist/2CbIKXWXTnLLCTno6X8LSz?si=af37cff7fe154bef' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800 underline'>My Spotify Playlist</a>"
      ]
    }
  ]
};
