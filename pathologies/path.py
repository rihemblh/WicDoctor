import os
from docx import Document
import markdown
from bs4 import BeautifulSoup

def extract_text_from_docx(docx_path):
    doc = Document(docx_path)
    text = []
    for para in doc.paragraphs:
        text.append(para.text)
    return '\n'.join(text)

def extract_h3_content(docx_path):
    sections = []
    docx_content = extract_text_from_docx(docx_path)
    abc = markdown.markdown(docx_content)
    soup = BeautifulSoup(abc, 'html.parser')
    h3_tags = soup.find_all('h3')

    for i, h3 in enumerate(h3_tags):
        # Find the content that follows the h3 tag
        content = []
        next_sibling = h3.find_next_sibling()

        # Gather all siblings until the next h3 tag
        while next_sibling and next_sibling.name != 'h3':
            content.append(str(next_sibling))
            next_sibling = next_sibling.find_next_sibling()

        sections.append({
            'title': h3.get_text(strip=True),  # The title of the h3
            'content': ''.join(content)  # The content following the h3 tag
        })

    return sections

# Get all the .docx files in the Pathologie directory
docx_files = [f for f in os.listdir('Pathologie') if f.endswith('.docx')]

for docx_file in docx_files:
    # Construct the full path to the .docx file
    docx_path = os.path.join('Pathologie', docx_file)
    
    # Extract content from the .docx file
    sections = extract_h3_content(docx_path)

    # First section as h2 component
    h2cc = sections[0]
    h2Component = f"<h1>{h2cc['title']}</h1><p>{h2cc['content']}</p>"

    hookscontent = ''
    itemsContent = ''

    # List of sections to exclude based on their titles
    excluded_titles = ["Balises SEO", "Optimisation SEO et Annotation pour IA"]

    # Dynamically generate index for sections
    for i, section in enumerate(sections[1:], start=1):
        # Skip sections that match the excluded titles
        if section['title'] in excluded_titles:
            print(f"Excluding section: {section['title']}")  # Debugging line
            continue

        # Dynamically create index (e.g., A, B, C, D... or 1, 2, 3, ...)
        sectionIndex = chr(65 + i)  # This will give you 'A', 'B', 'C'... based on the section number
        
        hook = f'<a href="javascript:void(0)" onclick="scrollToSection(\'{sectionIndex}\')"><button class="alphabet-button">{section["title"]}<i class="fas fa-arrow-down" style="color: #17d092;"></i></button></a>'

        hookscontent += hook

        itemComponent = f'<div class="container section-{sectionIndex}" id="{sectionIndex}"><div class="info-section"><div class="section-title center-block text-center"><h2>{section["title"]}</h2></div><div class="info-text"><p>{section["content"]}</p></div></div></div>'

        itemsContent += itemComponent

    bodyTemplate = f'''
    <section class="sptb section-bg">
        <div class="container">
            <div class="section-title center-block text-center">
                {h2Component}  
                <div class="button-container text-center">
                    {hookscontent}  
                </div>
            </div>

            {itemsContent}  
        </div>
    </section>
    <script>
        function scrollToSection(sectionId) {{
            console.log("Scrolling to section:", sectionId);  // Debugging line
            const section = document.getElementById(sectionId);
            
            if (section) {{
                // Calculate the position with offset
                const offset = 100; // Adjust this value as needed for desired offset
                const sectionTop = section.offsetTop - offset;

                // Scroll the page to the target position
                window.scrollTo({{
                    top: sectionTop,
                    behavior: 'smooth'
                }});
            }} else {{
                console.log("Section with id", sectionId, "not found!");  // Debugging line
            }}
        }}
    </script>
    '''

    # Read header and footer HTML content
    with open('header.html', 'r', encoding='utf-8') as file:
        header = file.read()
    with open('footer.html', 'r', encoding='utf-8') as file:
        footer = file.read()

    # Combine header, body, and footer
    output = header + bodyTemplate + footer

    # Extract the base filename without extension and create a new HTML filename
    html_filename = os.path.splitext(docx_file)[0] + '.html'

    # Write the output HTML to a file
    with open(html_filename, 'w', encoding='utf-8') as file:
        file.write(output)

    print(f"Generated HTML for {docx_file} as {html_filename}")
